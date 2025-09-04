"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

// Mock data for recent transactions
const recentTransactions = [
  {
    id: 1,
    type: "credit",
    description: "Salary Deposit",
    amount: 5000,
    date: "2024-01-15",
    category: "Income",
    from: "ABC Company",
  },
  {
    id: 2,
    type: "debit",
    description: "Grocery Shopping",
    amount: -120.5,
    date: "2024-01-14",
    category: "Food",
    to: "SuperMart",
  },
  {
    id: 3,
    type: "debit",
    description: "Electric Bill",
    amount: -85.3,
    date: "2024-01-13",
    category: "Utilities",
    to: "Power Company",
  },
  {
    id: 4,
    type: "credit",
    description: "Freelance Payment",
    amount: 750,
    date: "2024-01-12",
    category: "Income",
    from: "Client XYZ",
  },
  {
    id: 5,
    type: "debit",
    description: "Netflix Subscription",
    amount: -15.99,
    date: "2024-01-11",
    category: "Entertainment",
    to: "Netflix",
  },
]

export default function RecentTransactions() {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "credit" ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {transaction.type === "credit" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {transaction.type === "credit" ? `From: ${transaction.from}` : `To: ${transaction.to}`}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === "credit" ? "text-accent" : "text-foreground"}`}>
                  {transaction.type === "credit" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
