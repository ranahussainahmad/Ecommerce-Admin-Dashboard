import { SearchBar } from "@/components/search-bar"
import { ProductsGrid } from "@/components/products-grid"
import { Suspense } from "react"
import { ProductsGridSkeleton } from "@/components/products-grid-skeleton"

interface ProductsPageProps {
  searchParams: { q?: string; category?: string }
}

export const metadata = {
  title: "Products - MyShop",
  description: "Browse our extensive collection of quality products",
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our amazing collection of quality products</p>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        <Suspense fallback={<ProductsGridSkeleton />}>
          <ProductsGrid searchQuery={searchParams.q} category={searchParams.category} />
        </Suspense>
      </div>
    </div>
  )
}
