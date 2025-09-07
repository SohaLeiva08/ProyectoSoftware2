import { supabase } from "../../supabase-client";

export const createTask = async (task) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert(task)
    .select()
    .single();

  return { data, error };
};

export const getTasks = async () => {
  const response = await supabase.from("tasks").select("*");

  return response;
};

export const getTaskById = async (id) => {
  const response = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  return response;
};

export const updateTaskById = async ({ task, taskId }) => {
  const response = await supabase
    .from("tasks")
    .update(task)
    .eq("id", taskId)
    .select()
    .single();

  return response;
};
