"use server"

import { redirect } from "next/navigation";
import { addProduct } from "../prisma-db";

export type Errors = {
    title?: string;
    price?: string;
    description?: string;
}

export type FormState = {
    errors: Errors;
}

   export async function createProduct(prevState:FormState,data: FormData) {
        const title = data.get('title') as string
        const price = data.get('price') as string
        const description = data.get('description') as string

        const errors: Errors = {}

        if (!title) {
            errors.title = "Title is required"
        }
        if (!price) {
            errors.price = "Price is required"
        }
        if (!description) {
            errors.description = "Description is required"
        }

        if (Object.keys(errors).length > 0) {
            return { errors }
        }

        await addProduct(title, parseInt(price), description)
        redirect("products-db")
    }
