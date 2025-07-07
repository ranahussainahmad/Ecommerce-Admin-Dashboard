import { ProductCard } from "./product-card"
import { getProducts } from "@/lib/api"

interface ProductsGridProps {
  searchQuery?: string
  category?: string
  limit?: number
}

export async function ProductsGrid({ searchQuery, category, limit }: ProductsGridProps) {
  const products = await getProducts({ search: searchQuery, category, limit })

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
        {searchQuery && <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms</p>}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
