import { Submit } from "@/src/components/submit"
import { addProduct } from "@/src/prisma-db"
import { redirect } from "next/navigation"

export default function AddProductPage() {

    async function createProduct(data: FormData) {
        'use server'
        const title = data.get('title') as string
        const price = data.get('price') as string
        const description = data.get('description') as string
        await addProduct(title, parseInt(price), description)
        redirect("products-db")
    }

    return (
        <form action={createProduct} className="p-4 space-y-4 border rounded">
            <div>
                <label htmlFor="title" className="text-white">Product Title:</label>
                <input type="text" id="title" name="title" className="block w-full p-2 text-black border rounded text-white" />
                <label htmlFor="price" className="text-white">Product Price:</label>
                <input type="number" id="price" name="price" className="block w-full p-2 text-black border rounded text-white" />
                <label htmlFor="description" className="text-white">Product Description:</label>
                <input type="text" id="description" name="description" className="block w-full p-2 text-black border rounded text-white" />

            </div>
            {/* <button type="submit">Create Product</button> */}
            <Submit/>
        </form>
    )
}