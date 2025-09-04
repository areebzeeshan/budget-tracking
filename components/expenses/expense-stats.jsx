"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { TrendingDown, Calendar, Receipt, Target } from "lucide-react"

export default function ExpenseStats({ expenses }) {
  const stats = useMemo(() => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))

    const monthlyExpenses = expenses.filter((expense) => {
      const expenseDate = expense.date?.toDate ? expense.date.toDate() : new Date(expense.date)
      return expenseDate >= startOfMonth
    })

    const weeklyExpenses = expenses.filter((expense) => {
      const expenseDate = expense.date?.toDate ? expense.date.toDate() : new Date(expense.date)
      return expenseDate >= startOfWeek
    })

    const totalMonthly = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const totalWeekly = weeklyExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const avgDaily = totalMonthly / new Date().getDate()

    // Get top category
    const categoryTotals = {}
    monthlyExpenses.forEach((expense) => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount
    })
    const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0]

    return {
      totalMonthly,
      totalWeekly,
      avgDaily,
      topCategory: topCategory ? topCategory[0] : "None",
      topCategoryAmount: topCategory ? topCategory[1] : 0,
      transactionCount: monthlyExpenses.length,
    }
  }, [expenses])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{formatCurrency(stats.totalMonthly)}</div>
          <p className="text-xs text-muted-foreground">{stats.transactionCount} transactions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{formatCurrency(stats.totalWeekly)}</div>
          <p className="text-xs text-muted-foreground">Weekly spending</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.avgDaily)}</div>
          <p className="text-xs text-muted-foreground">Based on this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Category</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{stats.topCategory}</div>
          <p className="text-xs text-muted-foreground">{formatCurrency(stats.topCategoryAmount)}</p>
        </CardContent>
      </Card>
    </div>
  )
}
