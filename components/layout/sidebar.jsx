"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { LayoutDashboard, Wallet, Receipt, TrendingUp, FileText, Settings, LogOut, Menu, X } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, current: false },
  { name: "Accounts", href: "/accounts", icon: Wallet, current: false },
  { name: "Expenses", href: "/expenses", icon: Receipt, current: false },
  { name: "Transactions", href: "/transactions", icon: TrendingUp, current: false },
  { name: "Analytics", href: "/analytics", icon: TrendingUp, current: false },
  { name: "Statements", href: "/statements", icon: FileText, current: false },
  { name: "Settings", href: "/settings", icon: Settings, current: false },
]

export default function Sidebar({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("demo-auth")
    localStorage.removeItem("demo-user")
    onLogout()
  }

  const isCurrentPage = (href) => {
    if (typeof window !== "undefined") {
      return window.location.pathname === href
    }
    return false
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-card">
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-foreground">Budget ERP</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const current = isCurrentPage(item.href)
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    current
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              )
            })}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent bg-transparent"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}
