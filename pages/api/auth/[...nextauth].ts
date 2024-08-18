import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

function getGithubCredentials(){
    const clientId = process.env.GITHUB_ID
    const clientSecret = process.env.GITHUB_SECRET
    if (!clientId || !clientSecret)
        throw new Error("Missing Github clientId/clientSecret")
    return {clientId, clientSecret}
}

function getGoogleredentials(){
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    if (!clientId || !clientSecret)
        throw new Error("Missing Google clientId/clientSecret")
    return {clientId, clientSecret}
}



export const authOptions: NextAuthOptions = {
// Configure one or more authentication providers
    secret: process.env.AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: getGithubCredentials().clientId,
      clientSecret: getGithubCredentials().clientSecret,
    }),

    GoogleProvider({
        clientId: getGoogleredentials().clientId,
        clientSecret: getGoogleredentials().clientSecret,
      }),
    // ...add more providers here
  ],

  callbacks : {
    async session( {session}){
        return session
    },

    redirect() {
        return '/'
      },
    }
}

export default NextAuth(authOptions)