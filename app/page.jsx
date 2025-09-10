"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import AuthForm from "../components/auth/auth-form"
import Sidebar from "../components/layout/sidebar"
import AccountOverview from "../components/dashboard/account-overview"
import RecentTransactions from "../components/dashboard/recent-transactions"
import QuickActions from "../components/dashboard/quick-actions"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0]
        })
      } else {
        // User is signed out
        setUser(null)
      }
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar user={user} onLogout={handleSignOut} />

      <div className="lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 mt-12 lg:mt-0">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {user.displayName || 'User'}! Here's your financial overview.
            </p>
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
