const signIn = async ({ email, password }) => {
  const response = await fetch(`${window.env.API_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': window.env.API_KEY
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if( response.ok ) {
    localStorage.setItem('access_token', data.access_token);
    window.location.href = '/ui/app.html';
  }

  return response;
};

const signUp = async ({ email, password }) => {
  const response = await fetch(`${window.env.API_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': window.env.API_KEY,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if( response.ok ) {
    localStorage.setItem('access_token', data.access_token);
    window.location.href = '/ui/app.html';
  }

  return data;
};

const signOut = async () => {
  const response = await fetch(`${window.env.API_URL}/auth/v1/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': window.env.API_KEY,
    },
  });

  return response;
};

window.signUp = signUp;
window.signIn = signIn;
window.signOut = signOut;