import { cookies } from "next/headers"
import { redirect } from "next/navigation"

async function getUser() {
    'use server'

    const cookieStore = cookies()
    const jwt = cookieStore.get("jwt")

    if (jwt == null) {
        return undefined
    }

    const response = await fetch ("http://localhost:3001/api/v1" + "/auth/account", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${jwt?.value}`,
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        return response.json()
    } else {
        return undefined
    }
}

export default async function Page() {
    const user = await getUser()

    if (!user) {
        redirect('/login')
    }

    async function handleSignOut() {
        'use server'
        cookies().delete('jwt')
    }

    return (
    <div className="mx-auto p-2 mt-3" style={{maxWidth: 500}}>
        <h1>My Account</h1>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
        <form action={handleSignOut}>
            <button className="btn btn-primary" type="submit">Sign Out</button>
        </form>
    </div>
    )
}