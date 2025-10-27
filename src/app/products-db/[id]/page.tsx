import { getProductById } from "@/src/prisma-db";
import ProductEditForm from "./product-edit-form";
import type { Product } from "@/src/app/products-db/page";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product: Product | null = await getProductById(parseInt(id));

  if (!product) {
    notFound();
  }

  return <ProductEditForm product={product} />;
}