import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MyShop - Premium E-commerce Platform",
  description:
    "Discover amazing products with unbeatable quality and prices. Your one-stop destination for premium shopping experience.",
  keywords: "ecommerce, shopping, products, online store",
  authors: [{ name: "MyShop Team" }],
  openGraph: {
    title: "MyShop - Premium E-commerce Platform",
    description: "Discover amazing products with unbeatable quality and prices.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
