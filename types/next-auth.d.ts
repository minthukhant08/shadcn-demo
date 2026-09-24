// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface User {
        id: number
		name: string
		email: string
        accessToken: string
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
        accessToken: string
    }
}