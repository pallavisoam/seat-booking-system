const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
     name:{
        type:String,
        default:null
     },
     seats:{
        type:Array,
        default:null
     },
     created_at:{
        type:Date,
        default:Date.now()
     }
    },
    {
      timestamps:true
    }
  )
  
  module.exports = mongoose.model("User", userSchema);