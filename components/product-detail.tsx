"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Shield, Truck, RotateCcw, CreditCard } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  imageUrl: string
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const rating = (Math.random() * 2 + 3).toFixed(1)
  const reviews = Math.floor(Math.random() * 500 + 50)

  const getStockStatus = () => {
    if (product.stock === 0) return { class: "text-red-500", text: "Out of Stock", icon: "❌" }
    if (product.stock < 10) return { class: "text-yellow-500", text: `Only ${product.stock} left`, icon: "⚠️" }
    return { class: "text-green-600", text: "In Stock", icon: "✅" }
  }

  const stockStatus = getStockStatus()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          <Badge className="absolute top-4 left-4 bg-yellow-500">Premium</Badge>
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(Number(rating)) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-500 ml-2">
              {rating} ({reviews} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold">${product.price}</div>

          <div className={`flex items-center gap-2 ${stockStatus.class}`}>
            <span>{stockStatus.icon}</span>
            <span className="font-medium">{stockStatus.text}</span>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">Category</div>
              <div className="text-gray-600">{product.category}</div>
            </div>
            <div>
              <div className="font-medium">Stock</div>
              <div className="text-gray-600">{product.stock} units</div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Product Features</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-yellow-500" />
                  <span>30-Day Return Policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-purple-500" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
