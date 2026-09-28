import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'
import { authAPI } from "@/api/auth"

export const authOptions : AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const response = await authAPI.login({ email: credentials?.email!, password: credentials?.password! })
          return {
            id: 1,
            email: response.data.data.email,
            image: 'sdfa',
            name: response.data.data.name,
            role: response.data.data.roles,
            accessToken: response.data.data.token
          }
        } catch (error) {
          console.log(error)
        }
        return null
      }
    })
  ],
  callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (user) {
				Object.assign(token, user)
			}

			if (trigger === 'update') {
				return { ...token, ...session.user }
			}

			return token
		},
		async session({ session, token }) {
			if (token) {
				session.user = token
			}
			return session
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }