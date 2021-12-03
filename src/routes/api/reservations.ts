import * as express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { FatalError } from '../../utils/errors';
import Reservation from '../../models/reservation';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  if (!req.currentUser) {
    throw new FatalError('Middleware chain was not executed properly');
  }

  const myReservations = await Reservation.find({ username: req.currentUser.username });

  return res.status(200).send(myReservations);
});

export default router;
