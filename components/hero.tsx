import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MyShop</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Discover amazing products with unbeatable quality and prices. Your one-stop destination for premium shopping
          experience.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/products">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Shop Now
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-700 bg-transparent"
            >
              <Users className="mr-2 h-4 w-4" />
              Join Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
