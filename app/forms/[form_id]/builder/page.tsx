import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import FormBuilder from "./form-builder"

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
        <FormBuilder
            id={params.form_id}
            components={form.components}
            title={form.title}
            description={form.description}
            name={form.name}
        />
    )
}