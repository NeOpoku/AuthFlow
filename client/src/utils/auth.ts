import { JwtPayload, jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'id_token';

class AuthService {
  /**
   * TODO: return the decoded token
   */
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  /**
   * TODO: return a value that indicates if the user is logged in
   */
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * TODO: return a value that indicates if the token is expired
   */
  isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<{ exp?: number }>(token);
      if (!exp) return false;            // treat token with no exp as non‑expired
      return exp * 1000 < Date.now();    // exp is seconds → convert to ms
    } catch {
      return true;                       // malformed token counts as expired
    }
  }

  /**
   * TODO: return the token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * TODO: set the token to localStorage
   * TODO: redirect to the home page
   */
  login(idToken: string): void {
    localStorage.setItem(TOKEN_KEY, idToken);
    window.location.assign('/');
  }

  /**
   * TODO: remove the token from localStorage
   * TODO: redirect to the login page
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    window.location.assign('/login');
  }
}

export default new AuthService();

