"use server";

import { getUserCookie, setUserCookie } from "@/lib/cookies";
import { client } from "@/lib/sanityClient";

import { v4 as uuidv4 } from "uuid";

export async function submitUserForm(formData: FormData) {
  const name = formData.get("name") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const uniqueId = uuidv4();

  try {
    await client.create({
      _type: "user",
      name,
      lastName,
      email,
      uniqueId,
    });

    await setUserCookie(uniqueId);
    return { success: true, message: "User data submitted successfully" };
  } catch (error) {
    console.error("Error submitting user data:", error);
    return { success: false, message: "Error submitting user data" };
  }
}

export async function getUserDetails() {
  const uniqueId = await getUserCookie();
  if (!uniqueId) return null;

  try {
    const user = await client.fetch(
      `*[_type == "user" && uniqueId == $uniqueId][0]`,
      { uniqueId }
    );
    return user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}
