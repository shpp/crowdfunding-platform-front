
async function update(project) {
  const prefix = process.browser ? 'https://cors-anywhere.herokuapp.com/' : ''; // TODO: Remove when CORS will be fixed
  const url = `${prefix}https://back.donate.2.shpp.me/api/v1/projects/update`;
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${process.env.AUTH_TOKEN}`
      },
      body: new URLSearchParams(project).toString(),
    });

    return await request.json();

  } catch (error) {
    console.log(error);
  }
}
export default update;

