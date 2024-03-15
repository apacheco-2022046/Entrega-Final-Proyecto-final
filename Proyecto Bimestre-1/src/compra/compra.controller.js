
'use strict'
import productoModel from "../products/producto.model.js"
import compraModel from "./compra.model.js"

export const agregarCompra = async(req,res)=>{
    try {
        let data = req.body
        let producto = await productoModel.findOne({_id: data.producto} )
        if(!producto) return res.status(400).send({message:'Producto no encontrado'})
        let compra = new compraModel(data)
        await compra.save()
        return res.send({message: `Se pudo agregar exitosamente la compra ${producto.nombreProducto} `})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No se pudo agregar la compra'})

    }
}
