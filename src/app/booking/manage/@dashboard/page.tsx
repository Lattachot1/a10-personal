import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import getUserProfile from "@/libs/getUserProfile"

export default async function DashboardPage(){
    const session = await getServerSession(authOptions as any);
    if(!session){
        return(null);
    }
    const profile = await getUserProfile((session as any)?.user.token);
    var createdAt = new Date(profile.data.createdAt);

    return(
        <main className=" bg-slate-100 m-5 p-5">
            <h1 className="text-2xl font-medium ">{profile.data.name}'s Dashboard</h1>
            <table className="table-auto border border-separate border-spacing-2 ">
                <tbody>
                    <tr><td>Email</td><td>{profile.data.email}</td></tr>
                    <tr><td>Name</td><td>{profile.data.name}</td></tr>
                    <tr><td>Role</td><td>{profile.data.role}</td></tr>
                    <tr><td>Member since</td><td>{createdAt.toDateString()}</td></tr>
                </tbody>
            </table>
        </main>
    )
}