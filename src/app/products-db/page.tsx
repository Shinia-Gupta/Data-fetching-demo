import { removeProduct } from "@/src/actions/products";
import { getAllProducts } from "@/src/prisma-db";
import Link from "next/link";

export type Product = {
  id: number;
  title?: string;
  price: number;
  description: string | null ;
};

export default async function ProductsPage() {
    const products:Product[]=await getAllProducts();

    return (
        <ul className="space-y-4 p-4">
            {products.map((product) => (
                <li key={product.id} className="border p-4 rounded shadow">
                    <h2 className="text-xl font-bold">
                        <Link href={`/products-db/${product.id}`}>{product.title}</Link>
                    </h2>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    {product.description && <p className="mt-2">{product.description}</p>}
                    {/* If i want the onClick handler on the button, the component will become a client component. So to resolve thi issue, we will wrap the button int oa form and pass the action of deleting product there */}
                    <form action={removeProduct.bind(null, product.id)}>
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 mt-4">Delete</button>
                    </form>
                </li>
            ))}
        </ul>
    );
}


