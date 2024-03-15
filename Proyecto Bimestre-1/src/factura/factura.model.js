import mongoose from "mongoose"
import {Schema} from "mongoose"

const FacturaSchema = mongoose.Schema({
    usuario: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    compra: {
        type: Schema.ObjectId,
        ref: 'compra',
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    productos:[{
        type: Schema.ObjectId,
        ref:'producto',
        required: true
    }],
   
    
})


export default mongoose.model('factura',FacturaSchema)