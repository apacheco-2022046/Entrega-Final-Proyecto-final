'use strict'

import  Express  from "express"
import { agregarCompra, } from './compra.controller.js'


const api = Express.Router()




api.post('/agregarCompra',agregarCompra)


export default api