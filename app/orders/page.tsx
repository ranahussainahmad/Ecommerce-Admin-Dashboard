import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { OrdersPage } from "@/components/orders-page"

export const metadata = {
  title: "My Orders - MyShop",
  description: "View your order history",
}

export default async function Orders() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return <OrdersPage />
}
