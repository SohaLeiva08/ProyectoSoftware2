const createTask = async (task) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${window.env.API_URL}/rest/v1/tasks`, {
    method: "POST",
    headers: {
      apikey: window.env.API_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(task),
  });

  const data = await response.json();

  return data;
};

const getTasks = async () => {
  const response = await supabase.from("tasks").select("*");

  return response;
};

const getTaskById = async (id) => {
  const response = await fetch(`${window.env.API_URL}/rest/v1/tasks?id=eq.${id}&select=*`, {
    method: "GET",
    headers: {
      apikey: window.env.API_KEY,
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      Accept: "application/vnd.pgrst.object+json",
    },
  });

  const data = await response.json();

  return data;
};

const updateTaskById = async ({ task, taskId }) => {
  const token = localStorage.getItem("access_token");

  console.log( task, taskId );

  const response = await fetch(`${window.env.API_URL}/rest/v1/tasks?id=eq.${taskId}`, {
    method: "PATCH",
    headers: {
      apikey: window.env.API_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      Accept: "application/vnd.pgrst.object+json",
    },
    body: JSON.stringify(task),
  });

  const data = await response.json();

  return data;
};

window.createTask = createTask;
window.updateTaskById = updateTaskById;
window.getTaskById = getTaskById;