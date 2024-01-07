const express = require("express");

const router = express.Router();

// controllers
const {
  getAllUsers,
  bookUserSeat,
  defaultTrainDetails,
  blockSeat,
  getUserById
} = require("../controllers/user");

router.get("/users/", getAllUsers); // get users
router.post("/get-user-by-id", getUserById)
router.post("/book-seat/",bookUserSeat)
router.post('/train-details',defaultTrainDetails)
router.post('/blocked-seats',blockSeat)

module.exports = router;