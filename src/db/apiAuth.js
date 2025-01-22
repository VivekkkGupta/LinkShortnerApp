import supabase from "./supabase";

export async function login({ email, password }) {
  // Log input parameters
  // console.log("API call with email:", email, "password:", password);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(email),
      password: String(password),
    });

    if (error) {
      // console.error("Login error:", error);
      throw new Error(error.message);
    }

    // console.log("Login successful, data:", data);
    return data;
  } catch (err) {
    // console.error("Unexpected error:", err.message);
    throw err;
  }
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}

export async function signup({ name, email, password }) {
  // Log input parameters
  // console.log("API call with email:", email, "password:", password);
  // console.log(email, password, name);
  const { data, error } = await supabase.auth.signUp({
    email: String(email), // Ensure email is a string
    password: String(password), // Ensure password is a string
    options: {
      data: {
        name: String(name),
      },
    },
  });

  if (error) {
    // console.error("API error:", error); // Log API error
    throw new Error(error.message); // Ensure error message is thrown
  }

  // console.log("API response data:", data); // Log API response data
  return data;
}

export async function logout() {
  const { data, error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
