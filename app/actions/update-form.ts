"use server"

import { cookies } from "next/headers";
import Component from "../component";

export default async function updateForm(id: string, name: string, title: string, description: string, components: Component[]) {
    const body = { 
        "form": {
            "name": name,
            "title": title,
            "description": description,
            "components": components
        }
    }

    const cookieStore = cookies()
    const jwt = cookieStore.get("jwt")

    if (jwt == null) {
        throw new Error('We ran into an unexpected error, please try again later.')
    }

    try {
        const response = await fetch("http://localhost:3001/api/v1" + `/forms/${id}`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${jwt?.value}`,
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            throw new Error('We ran into an unexpected error, please try again later.')
        }
    } catch {
        throw new Error('We ran into an unexpected error, please try again later.')
    } 
}