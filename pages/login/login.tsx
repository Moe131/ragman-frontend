import React from "react";
import GithubSigninButton from "@/components/Buttons/GithubSigninButton";
import GoogleSigninButton from "@/components/Buttons/GoogleSigninButton";

interface Props {
}


const Login =  ({

}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl mb-10 text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <GithubSigninButton />
                    <GoogleSigninButton />
                </div>
                <div className="px-3 pb-3 text-center text-[12px] text-black/50 dark:text-white/50 md:px-4 md:pb-6">
                    Powered by { <a
                        href="https://github.com/Mondego/ragman-frontend"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                    >
                        RAGMan
                    </a>
                    }
                </div>
            </div>
        </div>
)
};

export default Login;

