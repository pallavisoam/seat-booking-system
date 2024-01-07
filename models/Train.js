const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema;

const trainSchema = new mongoose.Schema(
    {
     total_seats:{
        type:Number,
        default:null
     },
     total_rows:{
        type:Number,
        default:null
     },
     block_seats:{
        type:Array,
        default:null
     }
    },
    {
      timestamps:true
    }
  )
  
  module.exports = mongoose.model("Train", trainSchema);