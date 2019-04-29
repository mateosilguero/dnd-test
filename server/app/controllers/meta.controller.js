import BaseController from './base.controller';
import Constants from '../config/constants';

class MetaController extends BaseController {
  	index(req, res) {
		res.json({
			version: Constants.version,
		});
	}

	healthCheck(req, res) {
		res.sendStatus(200);
	}
}

export default new MetaController();
