'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login(prevState: any, formData: FormData) {
    const body = { 
        "identifier": formData.get("usernameOrEmail"),
        "password": formData.get("password")
    }
    try {
        const response = await fetch("http://localhost:3001/api/v1" + "/auth/login", {
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
        } else {
            if (response.status == 401) {
                return {
                    message: "Incorrect username or password."
                }
            } else {
                return {
                    message: "We ran into an unexpected error, please try again later."
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            message: "We ran into an unexpected error, please try again later."
        }
    } 

    redirect('/forms')
}