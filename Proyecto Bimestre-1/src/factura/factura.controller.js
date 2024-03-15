'use strict'

import Compra from '../compra/compra.model.js'
import User from '../user/user.model.js'
import Producto from '../products/producto.model.js'
import Factura from '../factura/factura.model.js'
import PDFDocument from 'pdfkit'
import fs from 'fs';



export const GFactura = async (req, res) => {
    try {
        let { idCompra } = req.params
        let compra = await Compra.findById(idCompra)
        if (!compra) return res.status(404).send({ message: 'No se puede generar factura, la compra no existe' })
        let producto = await Producto.find({ _id: { $in:compra.producto } })
        if (!producto || producto.length === 0) return res.status(404).send({ message: 'Error no hay productos' })
        let nombreProducto = producto.map(product => ({ name: producto.nombreProducto, precio: product.precio, descripcion: producto.descripcion }))
        let factura = {
          user: compra.user,
          producto: nombreProducto,
          compra: compra,
          total: total
        }

        let facture = new Factura(factura)
        await facture.save()
        return res.send({ message: 'La Factura se ha efectuado' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al efectuar la factura' })
    }
}


export const pdf = async (req, res) => {
    try {
        const {id} =   req.params
        const factura = await Factura.findById(id).populate('user').populate('producto')
        //Nuevo documento
        const doc = new PDFDocument();
        const fileName = `factura_${factura.user.name}.pdf`
        const writeStream = fs.createWriteStream(fileName);
         doc.pipe(writeStream);
        doc.fontSize(25).text('Factura', { align: 'center' }).moveDown(1);

        doc.fontSize(15).text(`Usuario: ${factura.user.name}`, { align: 'left' }).moveDown(1)
        doc.fontSize(16).text(`Total: $${factura.total.toFixed(2)}`, { align: 'right' }).moveDown(1)
       doc.end()


        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
        doc.pipe(res);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error '})
    }
};

