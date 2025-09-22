
const API_URL = window.env.API_URL;
const API_KEY = window.env.API_KEY;

const getTags = async () => {

  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/rest/v1/tags`, {
    method: 'GET',
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  });

  const data = await response.json();

  return data;
};

window.getTags = getTags;