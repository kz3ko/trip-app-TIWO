import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../../models/user';
import { isAdmin } from '../../utils/permissionsUtils';
import { requireParams } from '../../utils/requestUtils';

const router = express.Router();

router.post('/login', async (req, res) => {
  if (!process.env.JWT_KEY || !process.env.TOKEN_EXPIRING_TIME) {
    return res.status(500).send({ error: 'Bad server configuration: Token details missing' });
  }

  const errors = requireParams(req.body, 'username', 'password');
  if (errors) {
    return res.status(401).send(errors);
  }

  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (!existingUser || !await existingUser.passwordEquals(password)) { // Inline to lazily check it
    return res.status(401).send({
      error: 'Wrong username or password',
    });
  }

  const token = jwt.sign({ username }, process.env.JWT_KEY, {
    algorithm: 'HS256',
    expiresIn: parseInt(process.env.TOKEN_EXPIRING_TIME, 10),
  });
  const options = {
    maxAge: parseInt(process.env.TOKEN_EXPIRING_TIME, 10) * 1000,
  };
  return res.status(200)
    .cookie('authToken', token, options)
    .cookie('adminAccess', await isAdmin(existingUser), options)
    .end();
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const errors = requireParams(req.body, 'username', 'password');
  if (errors) {
    return res.status(401).send(errors);
  }

  const existingUser = await User.exists({ username });

  if (existingUser) {
    return res.status(400).send({
      username: 'User with this name already exists',
    });
  }

  const user = new User({ username });
  const passwordSet = await user.setPassword(password); // Should not throw
  if (passwordSet) {
    try {
      const resultDocument = await user.save();
      return res.send(resultDocument.response());
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  } else {
    return res.status(500).end();
  }
});

export default router;
