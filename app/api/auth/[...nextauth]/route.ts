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
        console.log(credentials, "credential....")
        try {
          const response = await authAPI.login({ email: credentials?.email!, password: credentials?.password! })
          console.log(response.data, 'login response...')
          return {
            id: 1,
            email: credentials?.email,
            image: 'sdfa',
            name: credentials?.email,
            accessToken: response.data.data
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