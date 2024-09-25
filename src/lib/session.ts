import { auth } from "@/auth";
import { cache } from "react";
import db from "./prisma";

export const getCurrentUser = cache(async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  try {
    const userDataFromDB = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    return userDataFromDB;
  } catch (error) {
    return null;
  }
});
