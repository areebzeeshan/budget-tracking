"use client"

import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

export default function ExpenseList({ expenses, isLoading }) {
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

  const getCategoryColor = (category) => {
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
      Business: "bg-slate-500/20 text-slate-400",
      Other: "bg-gray-500/20 text-gray-400",
    }
    return colors[category] || "bg-gray-500/20 text-gray-400"
  }

  const filteredExpenses = expenses.filter((expense) => {
    if (filters.category !== "all" && expense.category !== filters.category) {
      return false
    }
    // Add more filter logic here
    return true
  })

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading expenses...</p>
        </CardContent>
      </Card>
    )
  }

  if (filteredExpenses.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No expenses found. Add your first expense to get started!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <h3 className="font-medium text-sm">{expense.description}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`text-xs ${getCategoryColor(expense.category)}`}>{expense.category}</Badge>
                    {expense.paymentMethod && (
                      <span className="text-xs text-muted-foreground capitalize">
                        via {expense.paymentMethod.replace("-", " ")}
                      </span>
                    )}
                  </div>
                  {expense.notes && <p className="text-xs text-muted-foreground mt-1">{expense.notes}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold text-destructive">{formatCurrency(expense.amount)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(expense.date?.toDate ? expense.date.toDate() : expense.date)}
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
