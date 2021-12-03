import * as express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import Trip from '../../models/trip';
import Reservation from '../../models/reservation';
import authMiddleware from '../../middlewares/authMiddleware';
import adminOnlyMiddleware from '../../middlewares/adminOnlyMiddleware';
import { pickParams, requireParams } from '../../utils/requestUtils';

const WYCIECZKI_UPDATE = 'wycieczkiUpdate';
const REZERWACJE_UPDATE = 'rezerwacjeUpdate';

const getRouter = (io: SocketIOServer) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const result = await Trip.find();
    res.status(200).send(result);
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Trip.findById(id);

    if (result) {
      return res.status(200).send(result);
    }
    return res.status(404).end();
  });

  router.post('/', authMiddleware, adminOnlyMiddleware, async (req, res) => {
    const inputParams = [
      'nazwa',
      'docelowyKraj',
      'dataRozpoczecia',
      'dataZakonczenia',
      'cena',
      'maxMiejsc',
      'opis',
      'zdjecie',
      'galeria',
    ];
    const errors = requireParams(req.body, ...inputParams);
    if (errors) {
      return res.status(400).send(errors);
    }

    const trip = await new Trip({
      ...pickParams(req.body, ...inputParams),
      deleted: false,
      oceny: [],
      rezerwowane: 0,
    }).save();
    io.emit(WYCIECZKI_UPDATE);
    return res.status(201).send(trip);
  });

  router.put('/:id', authMiddleware, adminOnlyMiddleware, async (req, res) => {
    const { id } = req.params;
    const inputParams = [
      'nazwa',
      'docelowyKraj',
      'dataRozpoczecia',
      'dataZakonczenia',
      'cena',
      'maxMiejsc',
      'opis',
      'zdjecie',
      'galeria',
      'oceny',
    ];
    const errors = requireParams(req.body, ...inputParams);

    if (errors) {
      return res.status(400).send(errors);
    }

    const trip = await Trip.findByIdAndUpdate(id, {
      ...pickParams(req.body, ...inputParams),
    }, { useFindAndModify: true });
    io.emit(WYCIECZKI_UPDATE);
    return res.status(200).send(trip);
  });

  router.delete('/:id', authMiddleware, adminOnlyMiddleware, async (req, res) => {
    const { id } = req.params;
    const trip = await Trip.findOne({ _id: id });
    if (!trip) {
      return res.status(404).send({ error: 'Trip with this ID does not exist' });
    }
    trip.deleted = true;
    trip.save();
    io.emit(WYCIECZKI_UPDATE);

    return res.status(200);
  });

  router.post('/:id/booking', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const trip = await Trip.findOne({ _id: id });
    if (!trip) {
      return res.status(404).send({ error: 'Trip with this ID does not exist' });
    }

    if (trip.rezerwowane === trip.maxMiejsc) {
      return res.status(400).send({ error: 'Trip is fully booked' });
    }
    // eslint-disable-next-line no-underscore-dangle
    const reservationData = { wycieczka_id: trip._id, username: req.currentUser!.username };
    let reservation = await Reservation.findOne(reservationData);

    if (reservation) {
      reservation.miejsca += 1;
    } else {
      reservation = new Reservation({ ...reservationData, miejsca: 1 });
    }

    trip.rezerwowane += 1;
    await trip.save();
    io.emit(WYCIECZKI_UPDATE);
    await reservation.save();
    io.emit(REZERWACJE_UPDATE);
    return res.status(201).send({ reservation, trip });
  });

  router.delete('/:id/booking', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const trip = await Trip.findOne({ _id: id });
    if (!trip) {
      return res.status(404).send({ error: 'Trip with this ID does not exist' });
    }
    const reservationData = { wycieczka_id: trip._id, username: req.currentUser!.username };
    const reservation = await Reservation.findOne(reservationData);

    if (!reservation) {
      return res.status(404).send({ error: 'You have no reservations for this trip' });
    }
    if (!trip.rezerwowane || !reservation.miejsca) {
      return res.status(400).send({ error: 'Cannot un-book trip below 0 places' });
    }

    // Update trip places
    trip.rezerwowane -= 1;
    await trip.save();
    io.emit(WYCIECZKI_UPDATE);

    // Update reservation places
    reservation.miejsca -= 1;
    if (reservation.miejsca === 0) {
      await reservation.delete();
      io.emit(REZERWACJE_UPDATE);
      return res.status(204).end();
    }

    await reservation.save();
    io.emit(REZERWACJE_UPDATE);
    return res.status(200).send({ reservation, trip });
  });

  router.post('/:id/review', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const errors = requireParams(req.body, 'rating', 'comment');

    if (errors) {
      return res.status(400).send(errors);
    }
    const { rating, comment } = req.body;

    if (!(rating < 5 && rating >= 0)) {
      return res.status(400).send({ rating: 'Rating has to be a number in 0-5 range' });
    }

    const trip = await Trip.findOne({ _id: id });
    if (!trip) {
      return res.status(404).send({ error: 'Trip with this ID does not exist' });
    }

    // Check if user has reservations for this trip
    // eslint-disable-next-line no-underscore-dangle
    const reservations = await Reservation.find({ wycieczka_id: trip._id, username: req.currentUser!.username });
    if (!reservations.length) {
      return res.status(401).send({ error: 'You cannot rate a trip which you have not visited!' });
    }

    trip.oceny.push({
      // eslint-disable-next-line no-underscore-dangle
      username: req.currentUser!.username,
      gwiazdki: rating,
      komentarz: comment,
    });

    await trip.save();
    io.emit(WYCIECZKI_UPDATE);

    return res.status(200).send(trip);
  });
  return router;
};
export default getRouter;
