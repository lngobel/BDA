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
routes.get('/', index)
routes.get('/filter_year', filterYear)
routes.get('/:id', show)
routes.post('/', store)
routes.put('/:id', update)
routes.delete('/:id', remove)
export default routes;