import { model, Schema } from "mongoose";


const bookShema = new Schema({

    name:{
        type:String,
        required:[true, "Name is required"],
        unique:true,
        trim:true,
        toLowerCase:true
    },
    author:{
        type:String,
        trim:true,
        toLowerCase:true
    },
    price:{
        type:Number,
       
    },
    stock: {
        type:Number,
        min:0
        
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:[true, "Category is required"],
        
    },
     
    
    
    createDate:{
        type:Date,
        default: Date.now
    }


})


bookShema.set("toJSON",{ virtuals:true })
bookShema.set("toObject",{ virtuals:true })

export default model("books", bookShema)