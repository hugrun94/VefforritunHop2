
const baseurl = 'https://hop-verk1.herokuapp.com';

export async function get(endpoint) {
  console.log(baseurl)
  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;
  console.log(url)

  const options = {
    headers: {},
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  /* todo framkvæma get */
  const response = await fetch(url);
  const result = await response.json();

  return { result, status: response.status };
}
 function login(username, password) {
  return new Promise((resolve, reject) => {
    const user = {
      name: 'hugrun',
      username: 'admin',
    }

    if (username === 'error') {
      return reject('Villa');
    }

    if (username === 'admin' && password === '123') {
      return setTimeout(() => resolve({ loggedin: true, user }), 1000);
    }

    if (username !== 'admin') {
      return setTimeout(() => resolve({ loggedin: false, error: 'Notandi ekki til' }), 500);
    }

    return setTimeout(() => resolve({ loggedin: false, error: 'Vitlaust lykilorð' }), 500);
  });
}


/* todo aðrar aðgerðir */

export async function post(endpoint, data) {
  const url = `${baseurl}${endpoint}`;
  console.log(data);
  console.log(url);

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  // asdf breyta header ef innskráður

  const response = await fetch(url, options);
  const result = await response.json();
  console.log(response);
  console.log(result);

  return { result, status: response.status };
}

export default {
  get,
  login,
  post,
};
