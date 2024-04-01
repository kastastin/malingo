import { auth } from "@clerk/nextjs";

const adminIds = ["user_2e8A8Se1LjALFKtgoWBmfAro2o9"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) return false;

  return adminIds.indexOf(userId) !== -1;
};
