import axios from 'axios'

export async function getAllUsers(){
const res = await axios.get(`https://seat-booking-system.onrender.com/api/users/`)
return res
}

export async function bookUsersSeat(data){
    const res = await axios.post(`https://seat-booking-system.onrender.com/api/book-seat`, data)
    return res
}

export async function getSeatsMaster(data){
    const res = await axios.post(`https://seat-booking-system.onrender.com/api/train-details`,data)
    return res
}

export async function getUserById(data){
    const res = await axios.post(`https://seat-booking-system.onrender.com/api/get-user-by-id`, data)
    return res
}
