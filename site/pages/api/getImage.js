import { parse } from 'url';
import https from 'https';

export const runtime = process.env.RUNTIME;

export default (req, res) => {
  const { hostname, path } = parse(req.query.url, false);

  https.get({
    hostname,
    path,
    method: 'GET'
  }, (response) => {
    response.pipe(res);
  }).on('error', (error) => {
    // eslint-disable-next-line no-console
    console.error(`Error fetching: ${error.message}`);
    res.status(500).send('Error fetching the URL');
  });
};
