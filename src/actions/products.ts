"use server"

import { redirect } from "next/navigation";
import { addProduct, deleteProduct, updateProduct } from "../prisma-db";
import { revalidatePath } from "next/cache";

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

    export async function editProduct(
  id: number,
  prevState: FormState,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;

  const errors: Errors = {};

  if (!title) {
    errors.title = "Title is required";
  }

  if (!price) {
    errors.price = "Price is required";
  }

  if (!description) {
    errors.description = "Description is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await updateProduct(id, title, parseInt(price), description);
  redirect("/products-db");
}

export async function removeProduct(id: number) {
    deleteProduct(id);

    //now when the product is deleted, we need to refresh the page in order to see the changes. To solve this issue, we can use the revalidatePath method
    //we are telling Nextjs to refetch data for the path after deletion
    revalidatePath("/products-db");
}