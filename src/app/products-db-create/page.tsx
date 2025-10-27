"use client"

import { Submit } from "@/src/components/submit"
import { useActionState } from "react";
import { FormState,createProduct } from "@/src/actions/products";


export default function AddProductPage() {

    const initialState: FormState = {
        errors: {}
    }

    //This hook takes 2 parameters - 1. arg server action which is createproduct and 2. initial form state
    //The hook returns an array with 3 things - 1. the current form state 2. a new form action function to be used in the form 3. a boolean indicating if the action is pending and is currently being executed
    const [state, formAction, isPending] = useActionState(createProduct, initialState);



    return (
        <form action={formAction} className="p-4 space-y-4 border rounded">
            <div>
                <div>
                    <label htmlFor="title" className="text-white">Product Title:</label>
                    <input type="text" id="title" name="title" className="block w-full p-2 text-black border rounded text-white" />
                    {
                        state.errors.title && <p className="text-red-500">{state.errors.title}</p>
                    }
                </div>
                <div>
                    <label htmlFor="price" className="text-white">Product Price:</label>
                    <input type="number" id="price" name="price" className="block w-full p-2 text-black border rounded text-white" />
                    {
                        state.errors.price && <p className="text-red-500">{state.errors.price}</p>
                    }
                </div>
                <div>
                    <label htmlFor="description" className="text-white">Product Description:</label>
                    <input type="text" id="description" name="description" className="block w-full p-2 text-black border rounded text-white" />
                    {
                        state.errors.description && <p className="text-red-500">{state.errors.description}</p>
                    }

                </div>
            </div>
            {/* <button type="submit">Create Product</button> */}
            {/* The isPending value returned by the useActionState hook can be used to pass as a prop to handle the disabing of the button */}
            <Submit />
        </form>
    )
}