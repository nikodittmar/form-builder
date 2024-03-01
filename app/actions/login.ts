'use server'

import { redirect } from "next/navigation"

export async function login(prevState: any, formData: FormData) {

    console.log(formData.get("usernameOrEmail"))
    if (formData.get("password") != "Password123") {
        return {
            message: "Incorrect username or password!"
        }
    }
    redirect('/signup')
}