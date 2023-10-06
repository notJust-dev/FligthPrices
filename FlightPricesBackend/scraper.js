const puppeteer = require('puppeteer-core');
const { openDevtools } = require('./utils');

const SBR_WS_ENDPOINT =
  'wss://YOUR_USERNAME:YOUR_PASSWORD@brd.superproxy.io:9222';

async function parseRoute(div) {
  const airlineSpan = await div.$('[class^="LogoImage_container"] span');
  let airline = await airlineSpan?.evaluate((el) => el.textContent.trim());
  if (!airline) {
    const airlineImg = await div.$('[class^="LogoImage_container"] img');
    airline = await airlineImg?.evaluate((el) => el.alt.trim());
  }

  const departAt = await div.$eval(
    '[class^="LegInfo_routePartialDepart"] span',
    (el) => el.textContent.trim()
  );

  const arriveAt = await div.$eval(
    '[class^="LegInfo_routePartialArrive"] span',
    (el) => el.textContent.trim()
  );

  const duration = await div.$eval(
    '[class^="LegInfo_stopsContainer"] span',
    (el) => el.textContent.trim()
  );

  return {
    airline,
    departAt,
    arriveAt,
    duration,
  };
}

async function parseFlight(flight) {
  const price = await flight.$eval(
    '[class^="Price_mainPriceContainer"]',
    (el) => el.textContent.trim()
  );

  const [toDiv, fromDiv] = await flight.$$(
    '[class^="UpperTicketBody_legsContainer"] > div'
  );

  return {
    price,
    to: await parseRoute(toDiv),
    from: await parseRoute(fromDiv),
  };
}

async function scrapeFlights(from, to, departDate, returnDate) {
  console.log('Connecting to Scraping Browser...');

  const url = `https://www.skyscanner.net/transport/flights/${from}/${to}/${departDate}/${returnDate}/`;

  const browser = await puppeteer.connect({
    browserWSEndpoint: SBR_WS_ENDPOINT,
  });
  try {
    const page = await browser.newPage();
    console.log('Connected! Navigating to: ', url);

    // Open devtools
    // const client = await page.target().createCDPSession();
    // await openDevtools(page, client);

    await page.goto(url);
    // CAPTCHA handling: If you're expecting a CAPTCHA on the target page, use the following code snippet to check the status of Scraping Browser's automatic CAPTCHA solver
    // const client = await page.createCDPSession();
    // console.log('Waiting captcha to solve...');
    // const { status } = await client.send('Captcha.waitForSolve', {
    //     detectTimeout: 10000,
    // });
    // console.log('Captcha solve status:', status);

    // close the privacy popup
    await page.locator('#cookieBannerContent button').click();

    // parsing
    const flights = await page.$$('a[class^="FlightsTicket_link"]');
    console.log(flights.length);

    const data = await Promise.all(flights.map(parseFlight));

    return data;
  } finally {
    await browser.close();
  }
}

module.exports = {
  scrapeFlights,
};
