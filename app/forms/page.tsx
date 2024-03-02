import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

async function getForms() {
    'use server'

    const cookieStore = cookies()
    const jwt = cookieStore.get("jwt")

    if (jwt == null) {
        return undefined
    }

    const response = await fetch ("http://localhost:3001/api/v1" + "/forms", {
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
    const forms = await getForms()

    if (!forms) {
        redirect('/login')
    }

    const formList = forms.map( (form: any) =>
        <div className="card">
            <div className="card-body d-flex">
                <div>
                {form.name}
                </div>
                <Link className="ms-auto" href="">Edit Form</Link>
            </div>
        </div>
    )

    return (
    <div className="mx-auto p-2 mt-3" style={{maxWidth: 1000}}>
        <h1>Forms</h1>
        <button className="btn btn-primary">Create New Form</button>
        <div className="mt-3">{formList}</div>
        
    </div>
    )
}