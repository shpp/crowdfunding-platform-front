export async function update(project) {
  console.log(JSON.stringify(project));
  const prefix = process.browser ? 'https://cors-anywhere.herokuapp.com/' : ''; // TODO: Remove when CORS will be fixed
  const url = `${prefix}https://back.donate.2.shpp.me/api/v1/projects/update`;
  try {
    const request = await fetch (url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeURIComponent(JSON.stringify(project))
    });

    const response = await request.json();
    console.log('updated');
    console.log(response);
  } catch (error) {
    console.log(error)
  }

}

