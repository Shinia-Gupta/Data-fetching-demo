import { getAllProducts } from "@/src/prisma-db";
import ProductDetail from "./product-detail";
export type Product = {
  id: number;
  title?: string;
  price: number;
  description: string | null ;
};

export default async function ProductsPage({searchParams}: {searchParams?: Promise<{query?:string}>}) {
  const {query}=searchParams?await searchParams:{};
  const products:Product[]=await getAllProducts(query);
    
    
    return (
        <ProductDetail products={products} />
    );
}


// 1. We invoke the useOptimistic hook with the current state and a function returning the optimistic state. The optimistic state is available as the first return value which we have used to render the products.
// 2. We use the second return value i.e the setter function to call the update function and execute the logic to return the new state. This setter function reuns right before the server action(if.e removeProduct() from actions file). 
// 3. Users always see the optimistic state while the actual opertaion completes in the background.
// 4. Since we are using the hook in a server Component, we will get an issue of making the component as a client Component. To avoid this, we will move the useOptimistic hook code into a separate component which is a client component and then use that component inside this server component.