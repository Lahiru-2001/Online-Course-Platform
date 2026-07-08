import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
{
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },

    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    paymentStatus:{
        type:String,
        default:"Completed"
    },

    paymentAmount:{
        type:Number,
        default:0
    },

    progress:{
        type:Number,
        default:0
    },

    completedLessons:[
        Number
    ],

    currentLesson:{
        type:Number,
        default:0
    },

    completed:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

EnrollmentSchema.index(
{
    student:1,
    course:1
},
{
    unique:true
});

export default mongoose.model("Enrollment",EnrollmentSchema);