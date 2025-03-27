const mongoose=require('mongoose')


const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Book'
    },
    ratings:{
        type:Number,
        default:0,
        required:true,
        min: 1,
        max: 5
    },
    description:{
        type:String,
        required:true,
        trim: true,
        minlength: [10, 'Review description must be at least 10 characters long']
    }
},
{
    timestamps: true 
})

// Indexes for better query performance
reviewSchema.index({ book: 1, ratings: -1 });
reviewSchema.index({ user: 1, book: 1 }, { unique: true });


const Reviews=mongoose.model('reviews',reviewSchema);
module.exports=Reviews