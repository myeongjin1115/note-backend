import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, avatar, email, bio } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            username
          },
          {
            email
          }
        ]
      });
      if (exists) {
        throw Error("This username / email is already taken");
      }
      await prisma.createUser({
        username,
        avatar,
        email,
        bio
      });
      return true;
    }
  }
};
