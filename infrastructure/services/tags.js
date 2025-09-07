import { supabase } from "../../supabase-client";

export const getTags = async () => {
  const response = await supabase.from("tags").select("*");

  return response;
};
