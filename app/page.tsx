import { Hero } from "@/components/hero"
import { ProductsGrid } from "@/components/products-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Users, DollarSign, Star, Shield, Truck, Headphones, BoxIcon } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const stats = [
    { icon: BoxIcon, number: "1,200+", label: "Products" },
    { icon: DollarSign, number: "$2.5M+", label: "Total Sales" },
    { icon: Users, number: "50K+", label: "Happy Customers" },
    { icon: Star, number: "4.9", label: "Average Rating" },
  ]

  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data and transactions are protected with industry-leading security measures.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your orders delivered quickly with our reliable shipping partners.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our customer support team is always ready to help you with any questions.",
    },
  ]

  return (
    <div className="w-full">
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MyShop?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            We provide exceptional service and quality products that exceed your expectations.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Discover our most popular products loved by thousands of customers.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View All Products
              </Button>
            </Link>
          </div>
          <ProductsGrid limit={8} />
        </div>
      </section>
    </div>
  )
}
