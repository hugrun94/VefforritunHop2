
const baseurl = 'https://vefforritunar-api.herokuapp.com';

export async function get(endpoint) {
  const token = window.localStorage.getItem('token');

  console.log(token)

  const url = `${baseurl}${endpoint}`;

  console.log(url)

  const options = {
    headers: {},
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  /* todo framkvæma get */
  const response = await fetch(url, options);
  const result = await response.json();

  console.log(result)

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


  const token = window.localStorage.getItem('token');
  console.log(token)

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    console.log('token halló:', token)
  }

  const response = await fetch(url, options);
  const result = await response.json();
  //console.log(response);
  //console.log(result);

  return { result, status: response.status };
}


export async function postPhoto(endpoint, data) {
  const url = `${baseurl}${endpoint}`;
  console.log(data);
  console.log(url);

  const token = window.localStorage.getItem('token');
  console.log(token)

  const options = {
    body: data,
    headers: {
    },
    method: 'POST',
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    console.log('token halló:', token)
  }

  const response = await fetch(url, options);
  const result = await response.json();
  //console.log(response);
  //console.log(result);

  return { result, status: response.status };
}


export async function patch(endpoint, data) {
  const url = `${baseurl}${endpoint}`;
  console.log(data);
  console.log(url);


  const token = window.localStorage.getItem('token');
  console.log(token)

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'PATCH',
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    console.log('token halló:', token)
  }

  console.log(options)


  const response = await fetch(url, options);
  const result = await response.json();
  //console.log(response);
  //console.log(result);

  return { result, status: response.status };
}

export async function deleteh(endpoint, data) {
  const url = `${baseurl}${endpoint}`;
  console.log(data);
  console.log(url);


  const token = window.localStorage.getItem('token');

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'DELETE',
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    console.log('token halló:', token)
  }

  console.log(options)


  const response = await fetch(url, options);
  const result = await response.json();
  //console.log(response);
  //console.log(result);

  return { result, status: response.status };
}

export default {
  get,
  login,
  post,
  patch,
  deleteh,
};
