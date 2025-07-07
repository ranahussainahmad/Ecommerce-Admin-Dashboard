import { connectDB } from "./db"
import { Product } from "./models/product"

export async function getProducts({
  search,
  category,
  limit,
}: {
  search?: string
  category?: string
  limit?: number
} = {}) {
  try {
    await connectDB()

    const query: any = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ]
    }

    if (category) {
      query.category = { $regex: category, $options: "i" }
    }

    let productsQuery = Product.find(query).sort({ createdAt: -1 })

    if (limit) {
      productsQuery = productsQuery.limit(limit)
    }

    const products = await productsQuery.lean()
    return JSON.parse(JSON.stringify(products))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProductById(id: string) {
  try {
    await connectDB()

    const product = await Product.findById(id).lean()
    return product ? JSON.parse(JSON.stringify(product)) : null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}
