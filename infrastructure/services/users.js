import { supabase } from "../../supabase-client";

export const getUserByEmail = async (email) => {
  const response = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  return response;
};
