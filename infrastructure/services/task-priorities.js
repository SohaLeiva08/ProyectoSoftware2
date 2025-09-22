const getTaskPriorities = async () => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${window.env.API_URL}/rest/v1/task_priorities`, {
      method: 'GET',
      headers: {
        'apikey': window.env.API_KEY,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });

    const data = await response.json();

    return data;
}

window.getTaskPriorities = getTaskPriorities;