import { Router } from 'express';

import MetaController from './controllers/meta.controller';
import ItemController from './controllers/item.controller';

import errorHandler from './middleware/error-handler';

const routes = new Router();

routes.get('/', MetaController.index);


// Health
/**
 * @api {get} /health Healt Check
 * @apiGroup Health
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200
 *    OK
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 */
routes.get('/health', MetaController.healthCheck);

// Items
/**
 * @api {post} /items Create item
 * @apiGroup Items
 * @apiParam {String} description Item description
 * @apiParamExample {json} Input
 *    {
 *      "description": "Item description",
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 
 *    {
 *      "description": "Item description",
 *    }
 * @apiErrorExample {json} Create error
 *    HTTP/1.1 500 Internal Server Error
 */
routes.post('/items', ItemController.create);

/**
 * @api {get} /items Get all items
 * @apiGroup Items
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204
 *    [
 *    	{
 *      	"description": "Item description"
 *    	}
 *	  ]
 * @apiErrorExample {json} Create error
 *    HTTP/1.1 500 Internal Server Error
 */
routes.get('/items', ItemController.getAll);

/**
 * @api {get} /items/:id Get an item by id
 * @apiGroup Items
 * @apiParam {String} id Item id
 * @apiParamExample {json} Input
 *    {
 *      "description": "Item description",
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204
 *    	{
 *      	"description": "Item description"
 *    	}
 * @apiErrorExample {json} Create error
 *    HTTP/1.1 500 Internal Server Error
 */
routes.get('/items/:id', ItemController.getByID);

/**
 * @api {put} /items/:id Update an item
 * @apiGroup Items
 * @apiParam {String} id Item id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204
 *    	{
 *      	"description": "Item description"
 *    	}
 * @apiErrorExample {json} Create error
 *    HTTP/1.1 500 Internal Server Error
 */
routes.put('/items/:id', ItemController.update);

/**
 * @api {delete} /items/:id Delete an item
 * @apiGroup Items
 * @apiParam {String} id Item id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204
 *    	{
 *      	"description": "Item description"
 *    	}
 * @apiErrorExample {json} Create error
 *    HTTP/1.1 500 Internal Server Error
 */
routes.delete('/items/:id', ItemController.delete);

routes.use(errorHandler);

export default routes;
