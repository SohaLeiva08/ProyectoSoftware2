import { supabase } from "../../supabase-client";

export const signIn = async ({ email, password }) => {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return response;
};

export const signUp = async ({ email, password }) => {
  const response = await supabase.auth.signUp({
    email,
    password,
  });

  return response;
};

export const signOut = async () => {
  const response = await supabase.auth.signOut();

  return response;
};
