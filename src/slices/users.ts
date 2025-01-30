"use server";

import { IUser } from "@/models/user";
import { revalidateTag, revalidatePath } from "next/cache";

const API_BASE_URL = "http://10.20.220.43:3000/api/users";

async function fetchWithCache<T>(url: string, tags: string[]): Promise<T> {
  const response = await fetch(url, {
    next: { tags },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
}

export async function getUsers() {
  return fetchWithCache(`${API_BASE_URL}`, ["users"]);
}

export async function getUserById(id: string) {
  return fetchWithCache(`${API_BASE_URL}?id=${id}`, ["users", `user:${id}`]);
}

export async function createUser(userData: IUser) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  revalidateTag("users");
  revalidatePath("/users");

  return response.json();
}

export async function updateUser(id: string, updateData: IUser) {
  const response = await fetch(API_BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updateData }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  revalidateTag("users");
  revalidateTag(`user:${id}`);
  revalidatePath("/users");

  return response.json();
}

export async function deleteUser(id: string) {
  const response = await fetch(API_BASE_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  revalidateTag("users");
  revalidateTag(`user:${id}`);
  revalidatePath("/users");

  return response.json();
}
