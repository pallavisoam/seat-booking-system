const User = require("../models/User");
const Train = require("../models/Train")

exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.json({ user });
    } catch (error) {
        res.json({ error })
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await User.find({ _id: req.body._id })
        res.json({ user })
    } catch (error) {
        res.json({ error })
    }
}


exports.bookUserSeat = async (req, res) => {
    try {
        const findUserCount = await User.countDocuments({ name: req.body.name })
        const findUser = await User.find({ name: req.body.name })
        if (findUserCount > 0) {
            const user = await User.findOneAndUpdate({ name: req.body.name }, { name: req.body.name, seats: [...findUser[0].seats, ...req.body.seats] })
            res.json({ user })
        }
        else {
            const user = await new User(req.body).save();
            res.json({ user })
        }
    } catch (error) {
        res.json({ error })
    }
}

exports.defaultTrainDetails = async (req, res) => {
    try {
        if (req.body.seat_details !== undefined) {
            if (req.body.seat_details.total_rows > req.body.seat_details.total_seats) {
                res.json({ 'message': "The number of rows should not be greater than total number of seats." })
            }
            else {
                const train_details = await new Train(req.body.seat_details).save();
                res.json({ train_details })
            }
        } else {
            const train_details = await Train.find();
            res.json({ train_details })
        }
    } catch (error) {
        res.json({ error })
    }

}

exports.blockSeat = async (req, res) => {
    try {
        if (req.body.seat_details !== undefined) {
            const block_seat = await Train.findByIdAndUpdate({ _id: req.body._id }, { block_seats: req.body.seat_details.block_seats });
            res.json({ block_seat })
        } else {
            const block_seat = await Train.find();
            res.json({ block_seat })
        }
    } catch (error) {
        res.json({ error })
    }

}



