"use client"
import { Badge } from "../ui/badge"
import { Building, User, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function StatementPreview({ statementData, userEmail }) {
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
    <div className="p-8 bg-background text-foreground max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-bold mb-2">Budget ERP</h1>
        <h2 className="text-xl text-muted-foreground">Monthly Financial Statement</h2>
        <p className="text-lg mt-4">
          {statementData.period.month} {statementData.period.year}
        </p>
      </div>

      {/* Account Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Account Holder</p>
            <p className="font-medium">{userEmail}</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Statement Period</p>
            <p className="font-medium">
              {formatDate(statementData.period.startDate)} - {formatDate(statementData.period.endDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Account Summary */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Account Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Opening Balance</p>
            <p className="text-lg font-bold">{formatCurrency(statementData.summary.openingBalance)}</p>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Total Credits</p>
            <p className="text-lg font-bold text-accent">{formatCurrency(statementData.summary.totalCredits)}</p>
          </div>
          <div className="p-4 bg-destructive/10 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Total Debits</p>
            <p className="text-lg font-bold text-destructive">{formatCurrency(statementData.summary.totalDebits)}</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Closing Balance</p>
            <p className="text-lg font-bold">{formatCurrency(statementData.summary.closingBalance)}</p>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
        <div className="space-y-3">
          {statementData.transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
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
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {transaction.type === "credit" ? <User className="h-3 w-3" /> : <Building className="h-3 w-3" />}
                      <span className="text-xs text-muted-foreground">
                        {transaction.type === "credit" ? `From: ${transaction.fromTo}` : `To: ${transaction.fromTo}`}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === "credit" ? "text-accent" : "text-destructive"}`}>
                  {transaction.type === "credit" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Generated on{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          This statement is generated by Budget ERP - Your Complete Financial Management System
        </p>
      </div>
    </div>
  )
}
