import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const matchCriteria = (entry, query) => JSON.stringify(entry)
    .toUpperCase()
    .includes(query.toUpperCase());

export default function (db, currentExpressApp = express()) {
  const app = currentExpressApp;
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(morgan('dev'));

  app.get('/api/cars', (req, res) => {
    const query = req.query.query;
    if (query) {
      const result = db.get('cars').filter(c => query.split(' ').reduce((resultCriteria, q) => resultCriteria && matchCriteria(c, q), true)).value();
      res.status(200).json({ cars: result || [] });
    } else {
      res.status(200).json({ cars: [] });
    }
  });

  return app;
}
