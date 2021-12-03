import * as express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import FlashDeal from '../../models/flashDeal';
import authMiddleware from '../../middlewares/authMiddleware';
import adminOnlyMiddleware from '../../middlewares/adminOnlyMiddleware';
import { pickParams, requireParams } from '../../utils/requestUtils';

const FLASH_DEALS_UPDATE = 'flashDealsUpdate';
const getFlashDealsRouter = (io: SocketIOServer) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const now = new Date();
    const flashDeals = await FlashDeal.find({
      expires_at: { $gt: now }, starts_at: { $lt: now },
    });

    return res.status(200).send(flashDeals);
  });

  router.post('/', authMiddleware, adminOnlyMiddleware, async (req, res) => {
    const inputParams = [
      'expires_at',
      'starts_at',
      'wycieczka_id',
      'discount',
    ];
    const errors = requireParams(req.body, ...inputParams);
    if (errors) {
      return res.status(400).send(errors);
    }

    const flashDeal = await new FlashDeal(
      pickParams(req.body, ...inputParams),
    ).save();
    io.emit(FLASH_DEALS_UPDATE);

    return res.status(201).send(flashDeal);
  });

  return router;
};

export default getFlashDealsRouter;
