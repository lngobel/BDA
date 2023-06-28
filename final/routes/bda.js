import {
	index,
	show,
	store,
	update,
	remove,
	filterYear
}
	from '../app/controllers/entregador.js'
import { Router } from 'express';

const routes = Router();
routes.get('/entregadores', index)
routes.get('/entregadores/filter_year', filterYear)
routes.get('/entregadores/:id', show)
routes.post('/entregadores', store)
routes.put('/entregadores/:id', update)
routes.delete('/entregadores/:id', remove)
export default routes;