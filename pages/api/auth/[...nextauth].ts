import { User } from "@/types/user"
import { createUserTable, FindUserByEmail, InsertUser } from "@/utils/database/database"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

function getGithubCredentials(){
    const clientId = process.env.GITHUB_CLIENT_ID
    const clientSecret = process.env.GITHUB_CLIENT_SECRET
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
    async jwt({token,user}){
      if (user){
        const dbUser = await FindUserByEmail(user.email)
        if (dbUser && dbUser.length > 0){
          token.uid = dbUser[0].uid;
        }
      }
      return token
    },

    async session( {session, token}){
      if (token.uid) {
        session.user.uid = token.uid;
      }
        return session
    },

    async signIn({user}){
      try {
        await createUserTable()
        // check if user exists by finding user in database
        const userExists = (await FindUserByEmail(user.email)).length > 0
        if (!userExists) {
          // If user does not exist in database insert it
          const newUser = {email:user.email, name:user.name, image:user.image}
          await InsertUser(newUser)
        }
        return true
      }
      catch(error){
        console.log(error)
        return false
      }
    },

    redirect() {
        return '/'
      },
    }
}

export default NextAuth(authOptions)