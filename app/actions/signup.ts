'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signup(prevState: any, formData: FormData) {

    const body = { 
        "user": { 
            "username": formData.get("username"), 
            "email": formData.get("email"), 
            "password": formData.get("password") 
        } 
    }
    try {
        const response = await fetch("http://localhost:3001/api/v1" + "/users", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            let body = await response.json()

            cookies().set('jwt', body.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // One week
                path: '/',
            })

            redirect('/account')
        } else {
            let body = await response.json()
            if (response.status == 422 && body.hasOwnProperty("errors") && body.errors.length > 0) {
                return {
                    message: await body.errors[0]
                }
            } else {
                return {
                    message: "We ran into an unexpected error, please try again later."
                }
            }
        }
    } catch {
        return {
            message: "We ran into an unexpected error, please try again later."
        }
    }
}