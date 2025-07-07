import { ProductsGridSkeleton } from "@/components/products-grid-skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
        </div>
        <div className="mb-8">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <ProductsGridSkeleton />
      </div>
    </div>
  )
}
