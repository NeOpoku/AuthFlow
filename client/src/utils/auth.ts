import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    if (!token || typeof token === 'undefined') {
      return false;
    }
    return !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const { exp } = jwtDecode<{ exp?: number }>(token);
      if (!exp) return false;            // treat token with no exp as non‑expired
      return exp * 1000 < Date.now();    // exp is seconds → convert to ms
    } catch {
      return true;                       // malformed token counts as expired
    }
  }


  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem(TOKEN_KEY, idToken);
    window.location.assign('/');    
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem(TOKEN_KEY);
    window.location.assign('/login');
  }


export default new AuthService();
function loggedIn() {
  throw new Error('Function not implemented.');
}

