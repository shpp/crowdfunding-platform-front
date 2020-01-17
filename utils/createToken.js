import sha256 from 'js-sha256';

const createToken = (password) => {
  const sha = sha256(`${process.env.HASH_SALT}:${password}`);

  const utoa = (str) => window.btoa(unescape(encodeURIComponent(`admin: ${str}`)));

  localStorage.setItem('token', utoa(sha));
};

export default createToken;
