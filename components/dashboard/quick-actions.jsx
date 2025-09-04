"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Plus, ArrowUpDown, Receipt, FileText, TrendingUp, Settings } from "lucide-react"

const quickActions = [
  {
    title: "Add Expense",
    description: "Record a new expense",
    icon: Plus,
    color: "bg-destructive/20 text-destructive hover:bg-destructive/30",
  },
  {
    title: "Transfer Money",
    description: "Move between accounts",
    icon: ArrowUpDown,
    color: "bg-primary/20 text-primary hover:bg-primary/30",
  },
  {
    title: "Add Income",
    description: "Record income source",
    icon: Receipt,
    color: "bg-accent/20 text-accent hover:bg-accent/30",
  },
  {
    title: "Generate Report",
    description: "Create monthly statement",
    icon: FileText,
    color: "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30",
  },
  {
    title: "View Analytics",
    description: "Check spending patterns",
    icon: TrendingUp,
    color: "bg-chart-1/20 text-chart-1 hover:bg-chart-1/30",
  },
  {
    title: "Settings",
    description: "Manage preferences",
    icon: Settings,
    color: "bg-muted/20 text-muted-foreground hover:bg-muted/30",
  },
]

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-muted/50 bg-transparent"
              >
                <div className={`p-2 rounded-full ${action.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
