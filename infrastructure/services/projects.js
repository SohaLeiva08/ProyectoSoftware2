const createProject = async (project) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${window.env.API_URL}/rest/v1/projects`, {
    method: "POST",
    headers: {
      apikey: window.env.API_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      Accept: "application/vnd.pgrst.object+json",
    },
    body: JSON.stringify(project),
  });

  const data = await response.json();

  return data;
};

const addTagsToProject = async ({ projectId, tagIds }) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${window.env.API_URL}/rest/v1/projects_tags`, {
    method: "POST",
    headers: {
      apikey: window.env.API_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(tagIds.map(tagId => ({ project_id: projectId, tag_id: tagId }))),
  });

  const data = await response.json();

  return data;
}

const addMemberToProject = async ({ projectId, userEmail }) => {
  const userResponse = await getUserByEmail(userEmail);

  if (!userResponse.data) return { data: null, error: userResponse.error };

  const response = await supabase.from("project_members").insert({
    project_id: projectId,
    profile_id: userResponse.data.id,
  });

  return response;
};

const getProjects = async () => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/rest/v1/projects?select=*`, {
    method: "GET",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  });

  const data = await response.json();

  return data;
};

const getProjectById = async (id) => {

  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/rest/v1/projects?id=eq.${id}&select=*,projects_tags(tags(*)),tasks(*)`, {
    method: "GET",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      Accept: "application/vnd.pgrst.object+json",
    },
  });

  const data = await response.json();

  console.log( data );
  
  return data;

}

const updateProjectById = async (project) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${window.env.API_URL}/rest/v1/projects?id=eq.${project.id}`, {
    method: "PATCH",
    headers: {
      apikey: window.env.API_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      Accept: "application/vnd.pgrst.object+json",
    },
    body: JSON.stringify({
      name: project.name,
      description: project.description,
    }),
  });

  const data = await response.json();

  return data;
};

const deleteProjectById = async (id) => {
  const response = await fetch(`${window.env.API_URL}/rest/v1/projects?id=eq.${id}`, {
    method: "DELETE",
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

window.createProject = createProject;
window.getProjects = getProjects;
window.updateProjectById = updateProjectById;
window.deleteProjectById = deleteProjectById;
window.addTagsToProject = addTagsToProject;
window.getProjectById = getProjectById;