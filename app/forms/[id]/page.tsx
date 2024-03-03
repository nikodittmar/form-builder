import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

async function getForm(id: string) {
    'use server'

    const cookieStore = cookies()
    const jwt = cookieStore.get("jwt")

    if (jwt == null) {
        return undefined
    }

    const response = await fetch ("http://localhost:3001/api/v1" + `/forms/${id}`, {
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

export default async function Page({ params }: { params: { id: string } }) {
    const form = await getForm(params.id)

    if (!form) {
        redirect('/login')
    }

    return (
    <div className="mx-auto p-2 mt-3" style={{maxWidth: 1000}}>
        <h1>{form.name}</h1>
    </div>
    )
}