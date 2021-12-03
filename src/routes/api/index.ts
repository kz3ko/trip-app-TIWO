import * as express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import accountsRouter from './accounts';
import getTripsRouter from './trips';
import reservationsRouter from './reservations';
import getFlashDealsRouter from './flashDeals';

const getRouter = (io: SocketIOServer) => {
  const router = express.Router();
  router.use(express.json());
  router.use('/accounts', accountsRouter);
  router.use('/trips', getTripsRouter(io));
  router.use('/reservations', reservationsRouter);
  router.use('/flash-deals', getFlashDealsRouter(io));

  return router;
};

export default getRouter;
