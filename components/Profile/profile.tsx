import { Session } from "next-auth";
import Image from "next/image";
import SignOutButton from "../Buttons/SignoutButton/SignoutButton";

interface Prop {
    session:Session
}
export default function Profile({session}:Prop){
    return (
        <div className="flex w-full items-center">
        <div className="flex flex-1 items-center gap-x-3 px-1 py-3 text-sm font-semibold leading-6 text-gray-900">
            <div className="relative h-8 w-8 ">
                <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded"
                    src = {session.user?.image || ""}
                    alt = "Profile Picture"
                />
            </div>
            <span className="sr-only">Your Profile</span>
            <div className="flex flex-col w-36">
                <span className="text-white" aria-hidden="true"> {session.user?.name}</span>
                <span className="text-ellipsis overflow-hidden ... text-xs text-zinc-400" aria-hidden="true">{session.user?.email}</span>
            </div> 
        </div>
        <SignOutButton />
    </div>
    )
}