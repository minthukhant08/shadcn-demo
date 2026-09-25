// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface User {
        id: number
		name: string
		email: string
        accessToken: string
        role: Role
    }

    interface Session {
		user: User
	}
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: number
		name: string
		email: string
        role: Role
        accessToken: string
    }
}