
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import User from './User';
import { getAllUsers, getSeatsMaster } from './api/UserApi';
import DisplayTrainDetails from './DisplayTrainDetails';

function App() {

const [totalSeats, setTotalSeats] = useState(null)
const [totalSeatsInARow, setTotalSeatsInARow] = useState(null)
const [blockedSeats, setBlockedSeats] = useState([])
const [booked_seats, setBookedSeats] = useState([])

useEffect(() => {
  getAllSeatsDetails()
  getAllBookedSeats()
},[])

const getAllBookedSeats = async() => {
  let booked_temp_arr = []
  const res = await getAllUsers()
  res?.data?.user.forEach((item) => {
    booked_temp_arr = [...booked_temp_arr, ...item.seats]
  })
  setBookedSeats(booked_temp_arr)
}

const getAllSeatsDetails = async () => {
  const res = await getSeatsMaster()
  setTotalSeats(res.data.train_details[0].total_seats)
  setTotalSeatsInARow(res.data.train_details[0].total_rows)
  setBlockedSeats(res.data.train_details[0].block_seats)
}

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<User booked_seats={booked_seats} totalSeats = {totalSeats} blocked_seats = {blockedSeats}/>} />
        <Route path='/train-details' element={<DisplayTrainDetails />}/>
      </Routes>
     </div>
     </Router>
  );
}

export default App;
