import { prisma } from "./prisma";

export default function getUserTags(userId: string) {
  return prisma.tag.findMany({
    where: { userId: userId },
  });
}
