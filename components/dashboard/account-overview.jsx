"use client"

import { mockAccounts } from "../../lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Wallet, PiggyBank, TrendingUp, Plus, ArrowUpRight, ArrowDownRight, Receipt } from "lucide-react"

export default function AccountOverview() {
  const currentBalance = mockAccounts.current.balance
  const savingsBalance = mockAccounts.savings.balance
  const totalBalance = currentBalance + savingsBalance

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Total Balance Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">{formatCurrency(totalBalance)}</p>
              <p className="text-sm text-muted-foreground mt-1">Across all accounts</p>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-sm text-accent font-medium">+2.5%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Account */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{mockAccounts.current.type}</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-2xl font-bold">{formatCurrency(currentBalance)}</p>
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Available for spending</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Money
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Transfer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Savings Account */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{mockAccounts.savings.type}</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-2xl font-bold">{formatCurrency(savingsBalance)}</p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Growing your wealth</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Plus className="h-4 w-4 mr-1" />
                  Save More
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Withdraw
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ArrowUpRight className="h-4 w-4 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Income</p>
                <p className="text-lg font-semibold">{formatCurrency(5420)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ArrowDownRight className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Expenses</p>
                <p className="text-lg font-semibold">{formatCurrency(2180)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Saved</p>
                <p className="text-lg font-semibold">{formatCurrency(1240)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Receipt className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-lg font-semibold">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
