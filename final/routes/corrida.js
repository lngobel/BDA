import {
	index,
	show,
	store,
	update,
	remove,
}
	from '../app/controllers/corrida.js'
import { Router } from 'express';

const routes = Router();
routes.get('/', index)
routes.get('/:id', show)
routes.post('/', store)
routes.put('/:id', update)
routes.delete('/:id', remove)
export default routes;