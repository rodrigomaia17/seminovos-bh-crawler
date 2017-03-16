import express from 'express';
import bodyParser from 'body-parser';



export default function(currentExpressApp, dbLocation = 'cars.json'){
  const app = currentExpressApp || express();
  app.use(bodyParser.json()); // support json encoded bodies

  app.get('/api/cars', (req,res) => {
    res.status(200).json({ cars: []});
  });

  return app;
}
