import { getAllProducts } from "@/src/prisma-db";

type Product = {
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
                    <h2 className="text-xl font-bold">{product.title}</h2>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    {product.description && <p className="mt-2">{product.description}</p>}
                </li>
            ))}
        </ul>
    );
}


