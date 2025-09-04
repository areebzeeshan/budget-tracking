"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Download, Eye, FileText } from "lucide-react"

// Mock statement history data
const statementHistory = [
  {
    id: 1,
    month: "December",
    year: 2024,
    generatedDate: new Date(2025, 0, 1),
    totalTransactions: 45,
    netFlow: 2340.5,
    status: "completed",
  },
  {
    id: 2,
    month: "November",
    year: 2024,
    generatedDate: new Date(2024, 11, 1),
    totalTransactions: 38,
    netFlow: 1890.25,
    status: "completed",
  },
  {
    id: 3,
    month: "October",
    year: 2024,
    generatedDate: new Date(2024, 10, 1),
    totalTransactions: 42,
    netFlow: -450.75,
    status: "completed",
  },
  {
    id: 4,
    month: "September",
    year: 2024,
    generatedDate: new Date(2024, 9, 1),
    totalTransactions: 35,
    netFlow: 3200.0,
    status: "completed",
  },
]

export default function StatementHistory() {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Statement History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statementHistory.map((statement) => (
            <div
              key={statement.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/20 text-primary rounded-full">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">
                    {statement.month} {statement.year} Statement
                  </h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-sm text-muted-foreground">Generated: {formatDate(statement.generatedDate)}</p>
                    <p className="text-sm text-muted-foreground">{statement.totalTransactions} transactions</p>
                    <Badge variant={statement.status === "completed" ? "default" : "secondary"} className="text-xs">
                      {statement.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Net Flow</p>
                  <p className={`font-semibold ${statement.netFlow >= 0 ? "text-accent" : "text-destructive"}`}>
                    {statement.netFlow >= 0 ? "+" : ""}
                    {formatCurrency(statement.netFlow)}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {statementHistory.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No statements generated yet</p>
            <p className="text-sm text-muted-foreground mt-2">Generate your first monthly statement to see it here</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
