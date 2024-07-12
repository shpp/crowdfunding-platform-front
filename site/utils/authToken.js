import crypto from 'crypto';

export function createAuthToken(password) {
  const hash = crypto.createHash('sha256');
  const token = Buffer.from(`admin:${hash.update(`${process.env.HASH_SALT}:${password}`).digest('hex')}`).toString('base64');
  const expires = Date.now() + 604800000; // ttl is 1 week

  localStorage.setItem('token', JSON.stringify({
    value: token,
    expires
  }));
}

export function getAuthToken() {
  const tokenDataStr = localStorage.getItem('token');

  if (tokenDataStr) {
    const tokenData = JSON.parse(tokenDataStr);

    if (tokenData.expires && Date.now() < tokenData.expires) {
      return tokenData.value;
    }
  }

  return null;
}
