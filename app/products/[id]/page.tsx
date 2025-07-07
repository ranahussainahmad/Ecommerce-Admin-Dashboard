import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"
import { getProductById } from "@/lib/api"

interface ProductPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: "Product Not Found - MyShop",
    }
  }

  return {
    title: `${product.name} - MyShop`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
