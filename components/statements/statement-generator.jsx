"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { FileText, Download, Eye, Calendar } from "lucide-react"

export default function StatementGenerator({ statementData, onPreview, selectedMonth, selectedYear }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    const element = document.createElement("a")
    const file = new Blob(
      [
        `Monthly Statement - ${statementData.period.month} ${statementData.period.year}
        
Opening Balance: ${formatCurrency(statementData.summary.openingBalance)}
Total Credits: ${formatCurrency(statementData.summary.totalCredits)}
Total Debits: ${formatCurrency(statementData.summary.totalDebits)}
Closing Balance: ${formatCurrency(statementData.summary.closingBalance)}
Net Flow: ${formatCurrency(statementData.summary.netFlow)}

Transaction Details:
${statementData.transactions
  .map(
    (t) =>
      `${t.date.toLocaleDateString()} - ${t.description} - ${t.type === "credit" ? "+" : "-"}${formatCurrency(
        t.amount,
      )} - ${t.fromTo}`,
  )
  .join("\n")}`,
      ],
      { type: "text/plain" },
    )
    element.href = URL.createObjectURL(file)
    element.download = `statement-${statementData.period.month}-${statementData.period.year}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Statement Summary */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>
              Statement for {statementData.period.month} {statementData.period.year}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Opening Balance</p>
              <p className="text-lg font-semibold">{formatCurrency(statementData.summary.openingBalance)}</p>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Credits</p>
              <p className="text-lg font-semibold text-accent">{formatCurrency(statementData.summary.totalCredits)}</p>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Debits</p>
              <p className="text-lg font-semibold text-destructive">
                {formatCurrency(statementData.summary.totalDebits)}
              </p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Closing Balance</p>
              <p className="text-lg font-semibold">{formatCurrency(statementData.summary.closingBalance)}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Cash Flow</p>
                <p
                  className={`text-xl font-bold ${
                    statementData.summary.netFlow >= 0 ? "text-accent" : "text-destructive"
                  }`}
                >
                  {statementData.summary.netFlow >= 0 ? "+" : ""}
                  {formatCurrency(statementData.summary.netFlow)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-xl font-bold">{statementData.summary.transactionCount}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={onPreview} className="w-full bg-transparent" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Statement
          </Button>

          <Button onClick={handleDownloadPDF} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>

          <Button variant="outline" className="w-full bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Auto-Generate
          </Button>

          <div className="pt-4 border-t border-border">
            <h4 className="font-medium mb-2">Statement Period</h4>
            <p className="text-sm text-muted-foreground">
              {statementData.period.startDate.toLocaleDateString()} -{" "}
              {statementData.period.endDate.toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
