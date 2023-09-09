import request from 'request';

export const runtime = 'experimental-edge';

export default (req, res) => {
  request.get(req.query.url).pipe(res);
};
