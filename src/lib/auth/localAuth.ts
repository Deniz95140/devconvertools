export type LocalUser = {
  email: string;
  username: string;
  createdAt: string;
  passwordHash: string;
};

export type PublicUser = Omit<LocalUser, "passwordHash">;

const USERS_KEY = "devconvertools_users";
const SESSION_KEY = "devconvertools_session";

function hashPassword(password: string): string {
  return btoa(unescape(encodeURIComponent(password)));
}

function readUsers(): LocalUser[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as LocalUser[];
  } catch {
    return [];
  }
}

function writeUsers(users: LocalUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublicUser(user: LocalUser): PublicUser {
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}

export function getSessionUser(): PublicUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const email = localStorage.getItem(SESSION_KEY);
  if (!email) {
    return null;
  }

  const user = readUsers().find((entry) => entry.email === email);
  return user ? toPublicUser(user) : null;
}

export function signUp(email: string, username: string, password: string): PublicUser {
  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account already exists with this email.");
  }

  const newUser: LocalUser = {
    email: normalizedEmail,
    username: username.trim(),
    createdAt: new Date().toISOString(),
    passwordHash: hashPassword(password)
  };

  users.push(newUser);
  writeUsers(users);
  localStorage.setItem(SESSION_KEY, normalizedEmail);

  return toPublicUser(newUser);
}

export function signIn(email: string, password: string): PublicUser {
  const normalizedEmail = email.trim().toLowerCase();
  const user = readUsers().find((entry) => entry.email === normalizedEmail);

  if (!user || user.passwordHash !== hashPassword(password)) {
    throw new Error("Invalid email or password.");
  }

  localStorage.setItem(SESSION_KEY, normalizedEmail);
  return toPublicUser(user);
}

export function signOut(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(SESSION_KEY);
}

export function resetPassword(email: string, newPassword: string): void {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();
  const index = users.findIndex((entry) => entry.email === normalizedEmail);

  if (index < 0) {
    throw new Error("No account found for this email.");
  }

  users[index] = {
    ...users[index],
    passwordHash: hashPassword(newPassword)
  };

  writeUsers(users);
}