// API Configuration
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/backend_api";
const USE_DUMMY_DATA = process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "true";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Dummy Data Storage (simulates backend)
class DummyDataStore {
  private users: Array<User & { password: string }> = [];
  private currentUser: User | null = null;

  register(name: string, email: string, password: string): AuthResponse {
    // Simulate network delay
    const existingUser = this.users.find((u) => u.email === email);
    if (existingUser) {
      return { success: false, error: "User with this email already exists" };
    }

    const newUser: User & { password: string } = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      password, // In real app, this would be hashed
    };

    this.users.push(newUser);
    return {
      success: true,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    };
  }

  login(email: string, password: string): AuthResponse {
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    this.currentUser = { id: user.id, name: user.name, email: user.email };

    return {
      success: true,
      user: this.currentUser,
      token: "dummy-jwt-token-" + user.id,
    };
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }
}

const dummyStore = new DummyDataStore();

// Helper function to simulate network delay
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// API Service
export const apiService = {
  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    if (USE_DUMMY_DATA) {
      await delay();
      return dummyStore.register(name, email, password);
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    if (USE_DUMMY_DATA) {
      await delay();
      const result = dummyStore.login(email, password);

      if (result.success && result.token) {
        // Store token in localStorage
        localStorage.setItem("auth-token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      return result;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Login failed" };
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return { success: true, user: data.user, token: data.token };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  },

  async logout(): Promise<void> {
    if (USE_DUMMY_DATA) {
      await delay(200);
      dummyStore.logout();
      localStorage.removeItem("auth-token");
      localStorage.removeItem("user");
      return;
    }

    try {
      const token = localStorage.getItem("auth-token");

      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("auth-token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
      // Clear local storage anyway
      localStorage.removeItem("auth-token");
      localStorage.removeItem("user");
    }
  },

  async getCurrentUser(): Promise<User | null> {
    if (USE_DUMMY_DATA) {
      await delay(200);
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }

    try {
      const token = localStorage.getItem("auth-token");

      if (!token) {
        return null;
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user");
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("auth-token");
  },

  getStoredUser(): User | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
};

// Export config for display purposes
export const getApiConfig = () => ({
  apiUrl: API_URL,
  useDummyData: USE_DUMMY_DATA,
});
