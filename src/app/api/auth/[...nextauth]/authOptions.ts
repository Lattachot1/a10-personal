import userLogIn from "@/libs/userLogIn";
import getUserProfile from "@/libs/getUserProfile";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials) return null;
        const loginJson = await userLogIn(
          credentials.email,
          credentials.password
        );
        const token = (loginJson as any).token;
        if (!token) return null;
        const profileJson = await getUserProfile(token);
        const profile = (profileJson as any).data || profileJson;

        return {
          id: profile.id || profile._id || profile.email,
          name: profile.name,
          email: profile.email,
          role: profile.role,
          accessToken: token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken || user.accessToken;
        token.user = {
          name: user.name,
          email: user.email,
          role: user.role,
          token: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user || session.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};