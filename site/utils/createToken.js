import crypto from 'crypto';

const createAndSetToken = (password) => {
  const hash = crypto.createHash('sha256');
  const token = Buffer.from(`admin:${hash.update(`${process.env.NEXT_PUBLIC_HASH_SALT}:${password}`).digest('hex')}`).toString('base64');

  sessionStorage.setItem('token', token);
};

export default createAndSetToken;
