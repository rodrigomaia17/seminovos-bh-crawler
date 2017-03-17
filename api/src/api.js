import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

export default function (db, currentExpressApp = express()) {
  const app = currentExpressApp;
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(morgan('dev'));

  app.get('/api/cars', (req, res) => {
    const query = req.query.query;
    if (req.query.query) {
      const result = db.get('cars').filter(c => (
        JSON.stringify(c)
          .toUpperCase()
          .includes(query.toUpperCase())
      )).value();
      res.status(200).json({ cars: result || [] });
    } else {
      res.status(200).json({ cars: [] });
    }
  });

  return app;
}
