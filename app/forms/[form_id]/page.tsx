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

    try {
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
    } catch {
        return undefined
    }
}

export default async function Page({ params }: { params: { form_id: string } }) {
    const form = await getForm(params.form_id)

    if (!form) {
        redirect('/login')
    }

    return (
    <div className="mx-auto p-2 mt-3" style={{maxWidth: 1000}}>
        <h1>{form.name}</h1>
        <Link className="ms-auto" href={`/forms/${params.form_id}/builder`}>Edit Form</Link>
        <p className="form-control">https://localhost:3000/forms/1</p>
    </div>
    )
}