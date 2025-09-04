"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react"

export default function TransactionStats({ transactions }) {
  const stats = useMemo(() => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const monthlyTransactions = transactions.filter((transaction) => {
      const transactionDate = transaction.date?.toDate ? transaction.date.toDate() : new Date(transaction.date)
      return transactionDate >= startOfMonth
    })

    const credits = monthlyTransactions.filter((t) => t.type === "credit")
    const debits = monthlyTransactions.filter((t) => t.type === "debit")

    const totalCredits = credits.reduce((sum, t) => sum + t.amount, 0)
    const totalDebits = debits.reduce((sum, t) => sum + t.amount, 0)
    const netFlow = totalCredits - totalDebits

    return {
      totalCredits,
      totalDebits,
      netFlow,
      transactionCount: monthlyTransactions.length,
      creditCount: credits.length,
      debitCount: debits.length,
    }
  }, [transactions])

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
          <CardTitle className="text-sm font-medium">Money In</CardTitle>
          <TrendingUp className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">{formatCurrency(stats.totalCredits)}</div>
          <p className="text-xs text-muted-foreground">{stats.creditCount} credit transactions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Money Out</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{formatCurrency(stats.totalDebits)}</div>
          <p className="text-xs text-muted-foreground">{stats.debitCount} debit transactions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Flow</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${stats.netFlow >= 0 ? "text-accent" : "text-destructive"}`}>
            {formatCurrency(stats.netFlow)}
          </div>
          <p className="text-xs text-muted-foreground">This month's net flow</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.transactionCount}</div>
          <p className="text-xs text-muted-foreground">This month's activity</p>
        </CardContent>
      </Card>
    </div>
  )
}
