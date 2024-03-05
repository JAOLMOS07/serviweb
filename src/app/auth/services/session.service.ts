import { Token } from "../user";

export class SessionService {
  isLoggedIn(): boolean {
    return Object.entries(this.getToken()?.token || "").length !== 0;
  }
  getToken(): Token | null {
    const tokenString = localStorage.getItem("token");

    if (tokenString) {
      const tokenData = JSON.parse(tokenString);
      return {
        token: tokenData.token,
        name: tokenData.name,
        role: tokenData.role,
        email: tokenData.email,
        phone: tokenData.phone,
        expires_in: tokenData.expires_in,
      };
    }

    return null;
  }
  setToken(token: Token): void {
    localStorage.setItem("token", JSON.stringify(token));
  }
  deleteToken(): void {
    localStorage.removeItem("token");
  }
}
