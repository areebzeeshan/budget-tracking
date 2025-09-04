"use client"

import { useState, useMemo } from "react"
import { useAuth } from "../../hooks/use-auth"
import { useAppContext } from "../../components/providers/app-provider"
import Sidebar from "../../components/layout/sidebar"
import StatementGenerator from "../../components/statements/statement-generator"
import StatementPreview from "../../components/statements/statement-preview"
import StatementHistory from "../../components/statements/statement-history"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useSelector } from "react-redux"

export default function StatementsPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [showPreview, setShowPreview] = useState(false)
  const { user, isAuthenticated } = useAuth()
  const { transactions, expenses } = useSelector(state => state.transaction)
  const { currentAccount, savingsAccount } = useSelector(state => state.account)

  // Generate statement data
  const statementData = useMemo(() => {
    const startDate = new Date(selectedYear, selectedMonth, 1)
    const endDate = new Date(selectedYear, selectedMonth + 1, 0)

    // Mock data for demonstration
    const mockTransactions = [
      {
        id: 1,
        date: new Date(selectedYear, selectedMonth, 1),
        type: "credit",
        description: "Salary Deposit",
        amount: 5000,
        category: "Salary",
        fromTo: "ABC Company",
        account: "current",
      },
      {
        id: 2,
        date: new Date(selectedYear, selectedMonth, 3),
        type: "debit",
        description: "Grocery Shopping",
        amount: 120.5,
        category: "Food & Dining",
        fromTo: "SuperMart",
        account: "current",
      },
      {
        id: 3,
        date: new Date(selectedYear, selectedMonth, 5),
        type: "debit",
        description: "Electric Bill",
        amount: 85.3,
        category: "Bills & Utilities",
        fromTo: "Power Company",
        account: "current",
      },
      {
        id: 4,
        date: new Date(selectedYear, selectedMonth, 10),
        type: "credit",
        description: "Freelance Payment",
        amount: 750,
        category: "Freelance",
        fromTo: "Client XYZ",
        account: "current",
      },
      {
        id: 5,
        date: new Date(selectedYear, selectedMonth, 15),
        type: "debit",
        description: "Transfer to Savings",
        amount: 1000,
        category: "Transfer",
        fromTo: "Savings Account",
        account: "current",
      },
    ]

    const credits = mockTransactions.filter((t) => t.type === "credit")
    const debits = mockTransactions.filter((t) => t.type === "debit")

    const totalCredits = credits.reduce((sum, t) => sum + t.amount, 0)
    const totalDebits = debits.reduce((sum, t) => sum + t.amount, 0)

    return {
      period: {
        month: startDate.toLocaleDateString("en-US", { month: "long" }),
        year: selectedYear,
        startDate,
        endDate,
      },
      transactions: mockTransactions,
      summary: {
        totalCredits,
        totalDebits,
        netFlow: totalCredits - totalDebits,
        transactionCount: mockTransactions.length,
        openingBalance: 10000,
        closingBalance: 10000 + totalCredits - totalDebits,
      },
      accounts: {
        current: currentAccount,
        savings: savingsAccount,
      },
    }
  }, [selectedMonth, selectedYear, currentAccount, savingsAccount])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

  if (!isAuthenticated) {
    return <div>Please log in to access statements.</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 mt-12 lg:mt-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Monthly Statements</h1>
                <p className="text-muted-foreground mt-2">Generate and download your financial statements</p>
              </div>
              <div className="flex items-center space-x-4">
                <Select
                  value={selectedMonth.toString()}
                  onValueChange={(value) => setSelectedMonth(Number.parseInt(value))}
                >
                  <SelectTrigger className="w-40 bg-input">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={month} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(Number.parseInt(value))}
                >
                  <SelectTrigger className="w-32 bg-input">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Statement Generator */}
          <div className="mb-8">
            <StatementGenerator
              statementData={statementData}
              onPreview={() => setShowPreview(true)}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
            />
          </div>

          {/* Statement History */}
          <StatementHistory />

          {/* Statement Preview Modal */}
          {showPreview && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="text-xl font-bold">Statement Preview</h2>
                  <Button variant="outline" onClick={() => setShowPreview(false)} className="bg-transparent">
                    Close
                  </Button>
                </div>
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                  <StatementPreview statementData={statementData} userEmail={user?.email} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
