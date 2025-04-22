
import { UserLogin } from "../interfaces/UserLogin";
import AuthService from "../utils/auth";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }
  );

  if (!response.ok) {
    // attempt to pull out a server‑sent message
    let errMsg = response.statusText;
    try {
      const errBody = await response.json();
      errMsg = errBody.message || errMsg;
    } catch { /* ignore JSON parse errors */ }
    throw new Error(`Login failed: ${errMsg}`);
  }

  // parse the JWT returned by the server
  const data = (await response.json()) as { token: string };

  // TODO: set the token to localStorage & redirect via AuthService
  AuthService.login(data.token);

  return data;
};

export { login };
