import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { bookUsersSeat, getAllUsers,getSeatsMaster, getUserById } from './api/UserApi';
import { Link } from 'react-router-dom';

const DisplayTrainDetails = () => {
 
    const [totalSeats, setTotalSeats] = useState(null)
    const [totalSeatsInARow, setTotalSeatsInARow] = useState(null)
    const [blockedSeats, setBlockedSeats] = useState([])
    const [booked_seats, setBookedSeats] = useState([])
    const [userSeatDetails, setUserSeatDetails] = useState(null)
    
    useEffect(() => {
      getAllSeatsDetails()
      getAllBookedSeats()
      getUserDetails()
    },[])

    const getUserDetails = async() => {
      const user_id = sessionStorage.getItem("user_id")
      if(user_id){
        const res = await getUserById({_id:user_id})
        setUserSeatDetails(res?.data?.user[0])
      }
    }
    
    const getAllBookedSeats = async() => {
      let booked_temp_arr = []
      const res = await getAllUsers()
      res?.data?.user.forEach((item) => {
        booked_temp_arr = [...booked_temp_arr, ...item.seats]
      })
      setBookedSeats(booked_temp_arr)
      console.log('res is',booked_temp_arr)
    }
    
    const getAllSeatsDetails = async () => {
      const res = await getSeatsMaster()
      setTotalSeats(res.data.train_details[0].total_seats)
      setTotalSeatsInARow(res.data.train_details[0].total_rows)
      setBlockedSeats(res.data.train_details[0].block_seats)
    }
    const calculateRowsandRemainingSeats = () => {

        const fullRows = Math.floor(totalSeats/totalSeatsInARow);
        const remainingSeats = totalSeats % totalSeatsInARow
        const totalRowsForGrid = fullRows + (remainingSeats > 0 ? 1 : 0)
        return {
          totalRows:totalRowsForGrid,
          remainingSeats:remainingSeats
        }
      }
      
      
      const generateSeatNumbers = (rowIndex) => {
        const seatNumbers = [];
        const totalSeatsInRow = rowIndex < calculateRowsandRemainingSeats().totalRows ? totalSeatsInARow : calculateRowsandRemainingSeats().remainingSeats;
      
        for (let seatIndex = 1; seatIndex <= totalSeatsInRow; seatIndex++) {
          const seatNumber = (rowIndex - 1) * 7 + seatIndex;
          seatNumbers.push(seatNumber);
        }
        return seatNumbers;
      };
      
      const renderRow = (rowIndex) => (
        <div key={rowIndex} className="row" style={{display:'flex'}}>
            {generateSeatNumbers(rowIndex).map((seatNumber) => (
              <div key={seatNumber} className="seat" style={{border:'1px solid red', width:'30px', background:blockedSeats.includes(seatNumber) ? 'gray' : booked_seats.includes(seatNumber) ? 'green' : 'blue'}}>
                {seatNumber}
              </div>
            ))}
          </div>
      )
      
      const renderGrid = () => {
        const rows = [];
        for (let rowIndex = 1; rowIndex <= calculateRowsandRemainingSeats().totalRows ; rowIndex++) {
          rows.push(renderRow(rowIndex));
        }
        return rows;
      };

    return (
        <React.Fragment>
          <div>Username: {userSeatDetails?.name}</div>
          <p>Seats Booked by {userSeatDetails?.name}: </p>
          <div style={{display:'flex', flexWrap:'wrap', width:'50%', marginTop:'0rem', lineHeight:'0rem'}}>{userSeatDetails?.seats.map((item) => {return (<p key={item} style={{marginRight:'1rem'}}>{item}</p>)})}</div>
          <Link to = '/'><Button style={{marginTop:'0.5rem', marginBottom:'0.5rem', background:'blue', color:'white'}}>Add More Seats</Button></Link>
           <div className="seat-grid">{renderGrid()}</div> 
        </React.Fragment>
    )
}

export default DisplayTrainDetails