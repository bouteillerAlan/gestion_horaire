import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import cookie from 'js-cookie';

const API_URL = 'http://127.0.0.1:3001';

export const checkUser = () => {
  const jwt = cookie.get('jwt') || '';
  console.log(jwt);

  fetch(`${API_URL}/check/user`, {
    headers: {'Authorization': `Bearer ${jwt}`},
  }).then( (res: any) => {
    if (res.status !== 200) {
      // push to login page
      Router.push('/login');
    }
  });
};
