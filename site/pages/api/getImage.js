import request from 'request';

export default (req, res) => {
  request.get(req.query.url).pipe(res);
};
