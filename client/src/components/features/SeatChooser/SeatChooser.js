import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, loadSeats, getRequests } from '../../../redux/seatsRedux';
import './SeatChooser.scss';
import io from 'socket.io-client';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);

  // Lokalny stan dla socket
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Inicjalizacja połączenia z serwerem Socket.IO
    const socket = io(process.env.NODE_ENV === 'production' ? '' : 'ws://localhost:8000', { transports: ['websocket'] });
    setSocket(socket);

    socket.on('seatsUpdated', (seats) => {
      dispatch(loadSeats(seats)); // Aktualizuj stan przy użyciu loadSeats
    });

    return () => {
      socket.disconnect(); // Rozłączenie socket przy demontowaniu komponentu
    };
  }, [dispatch]);

  // Funkcja sprawdzająca, czy miejsce jest zajęte
  const isTaken = (seatId) => {
    return seats.some(item => (item.seat === seatId && item.day === chosenDay));
  }

  // Przygotowanie JSX dla każdego przycisku miejsca na podstawie dostępności
  const prepareSeat = (seatId) => {
    if (seatId === chosenSeat) {
      return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    } else if (isTaken(seatId)) {
      return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    } else {
      return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
    }
  }

  return (
    <div>
      <h3>Pick a seat</h3>
      <div className="mb-4">
        <small id="pickHelp" className="form-text text-muted ms-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ms-2"><Button outline color="primary" /> – it's empty</small>
      </div>
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i+1) )}</div>}
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
    </div>
  )
}

export default SeatChooser;
