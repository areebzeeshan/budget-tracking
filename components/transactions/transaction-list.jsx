"use client"

import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { MoreHorizontal, Edit, Trash2, ArrowUpRight, ArrowDownRight, Building, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

export default function TransactionList({ transactions, isLoading }) {
  const { filters } = useSelector((state) => state.transaction)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getCategoryColor = (category, type) => {
    if (type === "credit") {
      return "bg-accent/20 text-accent"
    }

    const colors = {
      "Food & Dining": "bg-red-500/20 text-red-400",
      Transportation: "bg-blue-500/20 text-blue-400",
      Shopping: "bg-purple-500/20 text-purple-400",
      Entertainment: "bg-pink-500/20 text-pink-400",
      "Bills & Utilities": "bg-orange-500/20 text-orange-400",
      Healthcare: "bg-green-500/20 text-green-400",
      Education: "bg-indigo-500/20 text-indigo-400",
      Travel: "bg-cyan-500/20 text-cyan-400",
      "Personal Care": "bg-yellow-500/20 text-yellow-400",
      "Home & Garden": "bg-emerald-500/20 text-emerald-400",
      "Gifts & Donations": "bg-rose-500/20 text-rose-400",
      "Business Expenses": "bg-slate-500/20 text-slate-400",
    }
    return colors[category] || "bg-gray-500/20 text-gray-400"
  }

  const filteredTransactions = transactions.filter((transaction) => {
    if (filters.type !== "all" && transaction.type !== filters.type) {
      return false
    }
    if (filters.category !== "all" && transaction.category !== filters.category) {
      return false
    }
    return true
  })

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading transactions...</p>
        </CardContent>
      </Card>
    )
  }

  if (filteredTransactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No transactions found. Add your first transaction to get started!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
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
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-sm">{transaction.description}</h3>
                    <Badge variant="outline" className="text-xs">
                      {transaction.account === "current" ? "Current" : "Savings"}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {transaction.type === "credit" ? <User className="h-3 w-3" /> : <Building className="h-3 w-3" />}
                      <span className="text-xs text-muted-foreground">
                        {transaction.type === "credit" ? `From: ${transaction.fromTo}` : `To: ${transaction.fromTo}`}
                      </span>
                    </div>
                    <Badge className={`text-xs ${getCategoryColor(transaction.category, transaction.type)}`}>
                      {transaction.category}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 mt-2">
                    {transaction.paymentMethod && (
                      <span className="text-xs text-muted-foreground capitalize">
                        via {transaction.paymentMethod.replace("-", " ")}
                      </span>
                    )}
                    {transaction.reference && (
                      <span className="text-xs text-muted-foreground">Ref: {transaction.reference}</span>
                    )}
                  </div>

                  {transaction.notes && <p className="text-xs text-muted-foreground mt-1">{transaction.notes}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className={`font-semibold ${transaction.type === "credit" ? "text-accent" : "text-destructive"}`}>
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.date?.toDate ? transaction.date.toDate() : transaction.date)}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
