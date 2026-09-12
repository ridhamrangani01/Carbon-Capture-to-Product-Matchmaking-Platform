import bcrypt from "bcryptjs";
import { db } from "./db";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "EMITTER" | "UTILIZER" | "RESEARCHER" | "ADMIN";
  organizationId?: string | null;
  organizationName?: string | null;
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email: email.toLowerCase().trim() },
    include: { organization: true },
  });
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const user = await db.user.findFirst({
    include: { organization: true },
  });
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as any,
    organizationId: user.organizationId,
    organizationName: user.organization?.name,
  };
}

export interface UserSession {
  userId: string;
  email: string;
  role: string;
}

export async function getSession(): Promise<UserSession | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  return {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
}

