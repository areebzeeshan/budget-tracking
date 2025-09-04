import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"
import ReduxProvider from "@/components/providers/redux-provider"
import AppProvider from "@/components/providers/app-provider"

export const metadata: Metadata = {
  title: "Budget ERP - Financial Management System",
  description: "Complete budget tracking and financial management system",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ReduxProvider>
          <AppProvider>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </AppProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
