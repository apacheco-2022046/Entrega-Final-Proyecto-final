import mongoose from "mongoose"
import {Schema} from "mongoose"

const CompraSchema = mongoose.Schema({
    producto: {
        type: Schema.ObjectId,
        ref: 'producto',
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    
})


export default mongoose.model('compra',CompraSchema)