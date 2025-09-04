"use client"

import { useState, useMemo } from "react"
import { mockTransactions, mockExpenses } from "../../lib/mock-data"
import Sidebar from "../../components/layout/sidebar"
import SpendingTrendsChart from "../../components/analytics/spending-trends-chart"
import CategoryBreakdownChart from "../../components/analytics/category-breakdown-chart"
import IncomeVsExpenseChart from "../../components/analytics/income-vs-expense-chart"
import MonthlyComparisonChart from "../../components/analytics/monthly-comparison-chart"
import AnalyticsStats from "../../components/analytics/analytics-stats"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")

  const mockData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentMonth = new Date().getMonth()

    return {
      monthlyData: months.slice(Math.max(0, currentMonth - 5), currentMonth + 1).map((month, index) => ({
        month,
        income: Math.floor(Math.random() * 3000) + 4000,
        expenses: Math.floor(Math.random() * 2000) + 2500,
        savings: Math.floor(Math.random() * 1000) + 500,
      })),
      categoryData: [
        { name: "Food & Dining", value: 1200, color: "#ef4444" },
        { name: "Transportation", value: 800, color: "#3b82f6" },
        { name: "Shopping", value: 600, color: "#8b5cf6" },
        { name: "Entertainment", value: 400, color: "#ec4899" },
        { name: "Bills & Utilities", value: 900, color: "#f97316" },
        { name: "Healthcare", value: 300, color: "#10b981" },
        { name: "Other", value: 500, color: "#6b7280" },
      ],
      weeklySpending: [
        { day: "Mon", amount: 120 },
        { day: "Tue", amount: 85 },
        { day: "Wed", amount: 200 },
        { day: "Thu", amount: 95 },
        { day: "Fri", amount: 180 },
        { day: "Sat", amount: 250 },
        { day: "Sun", amount: 160 },
      ],
      transactions: mockTransactions,
      expenses: mockExpenses,
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 mt-12 lg:mt-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Financial Analytics</h1>
                <p className="text-muted-foreground mt-2">Insights into your spending patterns and financial health</p>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-48 bg-input">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Analytics Stats */}
          <div className="mb-8">
            <AnalyticsStats data={mockData} />
          </div>

          {/* Charts Grid */}
          <div className="space-y-8">
            {/* Income vs Expense Trend */}
            <IncomeVsExpenseChart data={mockData.monthlyData} />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <CategoryBreakdownChart data={mockData.categoryData} />
              <SpendingTrendsChart data={mockData.weeklySpending} />
            </div>

            {/* Monthly Comparison */}
            <MonthlyComparisonChart data={mockData.monthlyData} />
          </div>
        </div>
      </div>
    </div>
  )
}
