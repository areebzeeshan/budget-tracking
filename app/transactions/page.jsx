"use client"

import { useState } from "react"
import { mockTransactions } from "../../lib/mock-data"
import Sidebar from "../../components/layout/sidebar"
import TransactionForm from "../../components/transactions/transaction-form"
import TransactionList from "../../components/transactions/transaction-list"
import TransactionFilters from "../../components/transactions/transaction-filters"
import TransactionStats from "../../components/transactions/transaction-stats"
import { Button } from "../../components/ui/button"
import { Plus } from "lucide-react"

export default function TransactionsPage() {
  const [showForm, setShowForm] = useState(false)
  const [transactions, setTransactions] = useState(mockTransactions)

  const handleAddTransaction = (transactionData) => {
    const newTransaction = {
      id: `transaction-${Date.now()}`,
      ...transactionData,
      date: new Date().toISOString(),
      createdAt: new Date(),
    }
    setTransactions([newTransaction, ...transactions])
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
                <h1 className="text-3xl font-bold text-foreground">Transaction Management</h1>
                <p className="text-muted-foreground mt-2">Track all your debits and credits</p>
              </div>
              <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Transaction</span>
              </Button>
            </div>
          </div>

          {/* Transaction Stats */}
          <div className="mb-8">
            <TransactionStats transactions={transactions} />
          </div>

          {/* Filters */}
          <div className="mb-6">
            <TransactionFilters />
          </div>

          {/* Transaction List */}
          <TransactionList transactions={transactions} isLoading={false} />

          {/* Add Transaction Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-card rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <TransactionForm onSubmit={handleAddTransaction} onCancel={() => setShowForm(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
