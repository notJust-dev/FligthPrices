const express = require('express');
const { scrapeFlights } = require('./scraper');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/search', async (req, res) => {
  const { from, to, departDate, returnDate } = req.query;

  if (!from || !to || !departDate || !returnDate) {
    res.status(400).send('Inputs are missing');
    return;
  }

  try {
    const data = await scrapeFlights(from, to, departDate, returnDate);
    res.send(data);
  } catch (e) {
    res.status(500).send('Failed to scrape!');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
