'use strict'

import express from 'express'
import {  GFactura, pdf } from './factura.controller.js'


const api = express.Router()

api.post('/factura/:idCompra',GFactura)
api.get('/PDF/:id', pdf);

export default api