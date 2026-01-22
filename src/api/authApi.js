const BASE_URL = process.env.REACT_APP_API_BASE_URL;

///////////////////////////////////////////////////////////////////////
// Register
export async function register(email, password, confirmPassword) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, confirmPassword }),
  });
  if (!res.ok) {
    throw new Error("Registration failed");
  }
  return res.json();
}

///////////////////////////////////////////////////////////////////////
// Login
export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}
///////////////////////////////////////////////////////////////////////
