
const prefix = process.browser ? 'https://cors-anywhere.herokuapp.com/' : ''; // TODO: Remove when CORS will be fixed

/* eslint-disable no-console */
export const fetchDataPost = async (body, url) => {
  console.log(`body${body}`);
  console.log(`URL${url}`);

  try {
    const response = await fetch(`${prefix}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${process.env.AUTH_TOKEN}`,
      },
      body,
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchDataGet = async (url) => {
  console.log(`URL${url}`);
  try {
    const response = await fetch(`${prefix}${url}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${process.env.AUTH_TOKEN}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};
