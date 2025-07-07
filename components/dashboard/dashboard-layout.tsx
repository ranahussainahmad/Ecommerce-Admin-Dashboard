"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Package, Plus } from "lucide-react"
import { DashboardAnalytics } from "./dashboard-analytics"
import { DashboardProducts } from "./dashboard-products"
import { DashboardAddProduct } from "./dashboard-add-product"

export function DashboardLayout() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your store and products</p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="add-product" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <DashboardAnalytics />
        </TabsContent>

        <TabsContent value="products">
          <DashboardProducts />
        </TabsContent>

        <TabsContent value="add-product">
          <DashboardAddProduct />
        </TabsContent>
      </Tabs>
    </div>
  )
}
