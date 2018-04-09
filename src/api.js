
const baseurl = process.env.REACT_APP_SERVICE_URL;

export async function get(endpoint) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

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

/* todo aðrar aðgerðir */

export async function post(endpoint, data) {
  const url = `${baseurl}${endpoint}`;

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

  return { result, status: response.status };
}

export default {
  get,
  post,
};
