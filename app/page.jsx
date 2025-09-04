"use client"

import { useState } from "react"
import { mockUser } from "../lib/mock-data"
import AuthForm from "../components/auth/auth-form"
import Sidebar from "../components/layout/sidebar"
import AccountOverview from "../components/dashboard/account-overview"
import RecentTransactions from "../components/dashboard/recent-transactions"
import QuickActions from "../components/dashboard/quick-actions"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("demo-auth") === "true"
    }
    return false
  })

  if (!isAuthenticated) {
    return <AuthForm onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={() => setIsAuthenticated(false)} />

      <div className="lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 mt-12 lg:mt-0">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {mockUser.name}! Here's your financial overview.</p>
          </div>

          {/* Dashboard Grid */}
          <div className="space-y-8">
            {/* Account Overview */}
            <AccountOverview />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Recent Transactions - Takes 2 columns */}
              <div className="xl:col-span-2">
                <RecentTransactions />
              </div>

              {/* Quick Actions - Takes 1 column */}
              <div className="xl:col-span-1">
                <QuickActions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
