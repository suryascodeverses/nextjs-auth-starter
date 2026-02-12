// Dummy data for development/testing without a backend server

export interface DummyUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Dummy users (password is plain text for demo: "password123")
export const dummyUsers: DummyUser[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', password: 'password123' },
];

let registeredUsers: DummyUser[] = [...dummyUsers];
let currentDummyUser: DummyUser | null = null;

export const dummyApi = {
  register: async (data: { name: string; email: string; password: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const existingUser = registeredUsers.find((u) => u.email === data.email);
    if (existingUser) throw new Error('User with this email already exists');
    const newUser: DummyUser = {
      id: Math.random().toString(36).substring(7),
      ...data,
    };
    registeredUsers.push(newUser);
    return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
  },

  login: async (data: { email: string; password: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const user = registeredUsers.find((u) => u.email === data.email);
    if (!user || user.password !== data.password) throw new Error('Invalid email or password');
    currentDummyUser = user;
    if (typeof window !== 'undefined') localStorage.setItem('dummyUser', JSON.stringify(user));
    return { success: true, user: { id: user.id, name: user.name, email: user.email }, token: 'dummy-token-' + user.id };
  },

  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    currentDummyUser = null;
    if (typeof window !== 'undefined') localStorage.removeItem('dummyUser');
    return { success: true };
  },

  me: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (typeof window !== 'undefined' && !currentDummyUser) {
      const stored = localStorage.getItem('dummyUser');
      if (stored) currentDummyUser = JSON.parse(stored);
    }
    if (!currentDummyUser) throw new Error('Not authenticated');
    return { user: { id: currentDummyUser.id, name: currentDummyUser.name, email: currentDummyUser.email } };
  },
};

export const resetDummyData = () => {
  registeredUsers = [...dummyUsers];
  currentDummyUser = null;
  if (typeof window !== 'undefined') localStorage.removeItem('dummyUser');
};
