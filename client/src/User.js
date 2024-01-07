import React, { useEffect, useState } from 'react'
import { bookUsersSeat, getAllUsers } from './api/UserApi';
import {useNavigate} from 'react-router-dom'
import { Button } from 'antd';

const User = ({booked_seats, blocked_seats, totalSeats}) => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [seatNumber, setSeatNumber] = useState('')
    
    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        const res = await getAllUsers()
        console.log('users is', res)
    }

    const handleAddSeat = async() => {
     let user_seat = []
     let current_seat = booked_seats.length === 0 ? 1 : (Math.max(...booked_seats)+1)

     if(current_seat + parseInt(seatNumber) > totalSeats){
        window.confirm('The coach is full.')
     }else {
        while(user_seat.length < parseInt(seatNumber)){
            if(!blocked_seats.includes(current_seat))
        {
            user_seat.push(current_seat)
        }
        current_seat++
        }
     const book_seat = await bookUsersSeat({
        name:name,
        seats:user_seat
     })
     console.log('book_seat',book_seat, user_seat)
     sessionStorage.setItem("user_id", book_seat?.data?.user?._id)
     
     navigate('/train-details')
     }
    }

    const handleSeatNumberInput = (targetValue) => {
        if(targetValue > 7){
            alert('Number of seats should not be greater than 7.')
        }else {
            setSeatNumber(targetValue)
        }
    } 

    return (
        <React.Fragment>
            <h1>Please enter your name.....</h1>
            <div style={{display:'flex',flexDirection:'column', width:'50%', margin:'0rem auto'}}>
            <input type='text' placeholder='enter your name' value={name} onChange={(e) => setName(e.target.value)} style={{marginTop:'2rem'}}/>
            <input type='number' placeholder='enter number of seats to be booked' onChange={(e) => handleSeatNumberInput(e.target.value)} value={seatNumber} style={{marginTop:'2rem'}}/>
            <button onClick={handleAddSeat} style={{marginTop:'2rem'}}>submit</button>
            </div>
        </React.Fragment>
    )
}

export default User