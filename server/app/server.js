import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes';
import Constants from './config/constants';
import multer from 'multer';
import fs from 'fs';
import Item from './models/item';

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `app/public`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

// Helmet helps you secure your Express apps by setting various HTTP headers
// https://github.com/helmetjs/helmet
app.use(helmet());

// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors());

// Request logger
// https://github.com/expressjs/morgan
if (!Constants.envs.test) {
  app.use(morgan('dev'));
}

// Parse incoming request bodies
// https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lets you use HTTP verbs such as PUT or DELETE
// https://github.com/expressjs/method-override
app.use(methodOverride());

// Mount public routes
app.use(`/public`, express.static(`${__dirname}/public`));

// Mount Client
app.use(`/app`, express.static(`${__dirname}/client`));

// Mount API routes
app.use(Constants.apiPrefix, routes);

// Mount API Docs
app.use(`${Constants.apiPrefix}/docs`, express.static(`${__dirname}/apidocs`));

// Images
/**
 * @api {post} /images/upload Upload a new image
 * @apiGroup Images
 * @apiParam {Formdata} image Image to upload
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200
 *    { }
 * @apiErrorExample {json} Login error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post(`${Constants.apiPrefix}/images/upload/:id`, upload.single('file'), (req, res, next) => {
  Item.findOneAndUpdate(
    { _id: req.params.id },
    { imageUrl: `/public/${req.file.originalname}` },
    console.log
  )
  res.json();
});

app.delete(`${Constants.apiPrefix}/images/:itemId`, function (req, res, next) {
  const dir = `${__dirname}/public/${req.params.itemId}`;
  if (fs.existsSync(dir)){
    fs.unlinkSync(dir);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
})

app.listen(Constants.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

export default app;
