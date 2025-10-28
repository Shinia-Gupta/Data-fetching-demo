"use client"

import { removeProduct } from "@/src/actions/products";
import { getAllProducts } from "@/src/prisma-db";
import Link from "next/link";
import { useOptimistic } from "react";

export type Product = {
  id: number;
  title?: string;
  price: number;
  description: string | null ;
};

export default function ProductDetail({products}: {products:Product[]}) {
    
    //the hook takes 2 parameters - 1. The initial state that you want to optimistically update. This is our list of products fetched from the database. 2. A function that determines how to update the state optimistically. This function takes 2 arguments - the current state which we are calling currentProducts and an additional argument to help create the new state. For our scenario, the additional argument will be the id of the product that we want to delete. The function will return a new array of products excluding the product with the specified id and the function to trigger the optimistic update. The function takes one argument of any type and will call the update function that we have defined as the second argument to useOptimistic

    const [optimisticProducts,setOptimisticProducts]=useOptimistic(products,(currentProducts,productId)=>{
        return currentProducts.filter(product=>product.id!==productId);
    })

    const removeProductById=async(productId:number)=>{
        //1. Optimistically update the UI
        setOptimisticProducts(productId);
        //2. Call the server action to delete the product from the database
        await removeProduct(productId);
    }
    return (
        <ul className="space-y-4 p-4">
            {optimisticProducts.map((product) => (
                <li key={product.id} className="border p-4 rounded shadow">
                    <h2 className="text-xl font-bold">
                        <Link href={`/products-db/${product.id}`}>{product.title}</Link>
                    </h2>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    {product.description && <p className="mt-2">{product.description}</p>}
                    {/* If i want the onClick handler on the button, the component will become a client component. So to resolve thi issue, we will wrap the button int oa form and pass the action of deleting product there */}
                    <form action={removeProductById.bind(null,product.id)}>
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 mt-4">Delete</button>
                    </form>
                </li>
            ))}
        </ul>
    );
}


// 1. We invoke the useOptimistic hook with the current state and a function returning the optimistic state. The optimistic state is available as the first return value which we have used to render the products.
// 2. We use the second return value i.e the setter function to call the update function and execute the logic to return the new state. This setter function reuns right before the server action(if.e removeProduct() from actions file). 
// 3. Users always see the optimistic state while the actual opertaion completes in the background.
// 4. Since we are using the hook in a server Component, we will get an issue of making the component as a client Component. To avoid this, we will move the useOptimistic hook code into a separate component which is a client component and then use that component inside this server component.