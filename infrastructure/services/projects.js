import { supabase } from "../../supabase-client";
import { getUserByEmail } from "./users";

export const createProject = async (project) => {
  const response = await supabase
    .from("projects")
    .insert({
      name: project.name,
      description: project.description,
    })
    .select()
    .single();

  return response;
};

export const addMemberToProject = async ({ projectId, userEmail }) => {
  const userResponse = await getUserByEmail(userEmail);

  if (!userResponse.data) return { data: null, error: userResponse.error };

  const response = await supabase.from("project_members").insert({
    project_id: projectId,
    profile_id: userResponse.data.id,
  });

  return response;
};

export const getProjects = async () => {
  const response = await supabase
    .from("projects")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return response;
};

export const updateProjectById = async (project) => {
  const response = await supabase
    .from("projects")
    .update({
      name: project.name,
      description: project.description,
    })
    .eq("id", project.id)
    .select()
    .single();

  return response;
};

export const deleteProjectById = async (id) => {
  const response = await supabase.from("projects").delete().eq("id", id);

  return response;
};
