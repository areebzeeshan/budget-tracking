"use client"

import { useState } from "react"
import { mockExpenses } from "../../lib/mock-data"
import Sidebar from "../../components/layout/sidebar"
import ExpenseForm from "../../components/expenses/expense-form"
import ExpenseList from "../../components/expenses/expense-list"
import ExpenseFilters from "../../components/expenses/expense-filters"
import ExpenseStats from "../../components/expenses/expense-stats"
import { Button } from "../../components/ui/button"
import { Plus } from "lucide-react"

export default function ExpensesPage() {
  const [showForm, setShowForm] = useState(false)
  const [expenses, setExpenses] = useState(mockExpenses)

  const handleAddExpense = (expenseData) => {
    const newExpense = {
      id: `expense-${Date.now()}`,
      ...expenseData,
      date: new Date().toISOString(),
      createdAt: new Date(),
    }
    setExpenses([newExpense, ...expenses])
    setShowForm(false)
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
                <h1 className="text-3xl font-bold text-foreground">Expense Management</h1>
                <p className="text-muted-foreground mt-2">Track and manage your daily expenses</p>
              </div>
              <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Expense</span>
              </Button>
            </div>
          </div>

          {/* Expense Stats */}
          <div className="mb-8">
            <ExpenseStats expenses={expenses} />
          </div>

          {/* Filters */}
          <div className="mb-6">
            <ExpenseFilters />
          </div>

          {/* Expense List */}
          <ExpenseList expenses={expenses} isLoading={false} />

          {/* Add Expense Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-card rounded-lg p-6 w-full max-w-md">
                <ExpenseForm onSubmit={handleAddExpense} onCancel={() => setShowForm(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
