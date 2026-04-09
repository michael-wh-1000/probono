"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <div className="overflow-hidden min-h-screen flex flex-col">
      <Header />
      {children}
      <div className="flex-1"></div>
      <Footer />
    </div>
  )
}
