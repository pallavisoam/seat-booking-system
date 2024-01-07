import React from 'react'

const TrainDetails = () => {

const [totalSeats, setTotalSeats] = useState(null)
const [seatsInARow, setSeatsInARow] = useState(null)


    return (
        <React.Fragment>
            <div style={{display:'flex',flexDirection:'column', width:'50%', margin:'0rem auto'}}>
                <input type='number' value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)} placeholder='Enter total number of seats' style={{marginTop:'2rem'}}/>
                <input type='number' value={seatsInARow} onChange={(e) => seatsInARow(e.target.value)} placeholder='Enter total number of seats in a row' style={{marginTop:'2rem'}}/>
                <button style={{marginTop:'2rem'}}>Submit</button>
            </div>
        </React.Fragment>
    )
}