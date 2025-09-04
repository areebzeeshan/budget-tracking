"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { TrendingUp, TrendingDown, Target, PiggyBank, Activity, DollarSign } from "lucide-react"

export default function AnalyticsStats({ data }) {
  const stats = useMemo(() => {
    const totalIncome = data.monthlyData.reduce((sum, month) => sum + month.income, 0)
    const totalExpenses = data.monthlyData.reduce((sum, month) => sum + month.expenses, 0)
    const totalSavings = data.monthlyData.reduce((sum, month) => sum + month.savings, 0)
    const avgMonthlyIncome = totalIncome / data.monthlyData.length
    const avgMonthlyExpenses = totalExpenses / data.monthlyData.length
    const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1)

    return {
      totalIncome,
      totalExpenses,
      totalSavings,
      avgMonthlyIncome,
      avgMonthlyExpenses,
      savingsRate,
      netWorth: totalIncome - totalExpenses,
    }
  }, [data])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">{formatCurrency(stats.totalIncome)}</div>
          <p className="text-xs text-muted-foreground">Avg: {formatCurrency(stats.avgMonthlyIncome)}/mo</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{formatCurrency(stats.totalExpenses)}</div>
          <p className="text-xs text-muted-foreground">Avg: {formatCurrency(stats.avgMonthlyExpenses)}/mo</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
          <PiggyBank className="h-4 w-4 text-chart-3" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-chart-3">{formatCurrency(stats.totalSavings)}</div>
          <p className="text-xs text-muted-foreground">{stats.savingsRate}% savings rate</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${stats.netWorth >= 0 ? "text-accent" : "text-destructive"}`}>
            {formatCurrency(stats.netWorth)}
          </div>
          <p className="text-xs text-muted-foreground">Income - Expenses</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">78%</div>
          <p className="text-xs text-muted-foreground">Of monthly target</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Financial Health</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">Good</div>
          <p className="text-xs text-muted-foreground">Above average</p>
        </CardContent>
      </Card>
    </div>
  )
}
