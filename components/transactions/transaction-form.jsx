"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const transactionCategories = {
  credit: [
    "Salary",
    "Freelance",
    "Business Income",
    "Investment Returns",
    "Rental Income",
    "Gifts Received",
    "Refunds",
    "Interest Earned",
    "Other Income",
  ],
  debit: [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Personal Care",
    "Home & Garden",
    "Gifts & Donations",
    "Business Expenses",
    "Loan Payments",
    "Insurance",
    "Other Expenses",
  ],
}

export default function TransactionForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    type: "debit",
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    account: "current",
    fromTo: "",
    paymentMethod: "",
    reference: "",
    notes: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.amount || !formData.description || !formData.category || !formData.fromTo) {
      alert("Please fill in all required fields")
      return
    }

    onSubmit({
      ...formData,
      amount: Number.parseFloat(formData.amount),
      date: new Date(formData.date),
    })
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Reset category when type changes
      ...(field === "type" && { category: "" }),
    }))
  }

  const availableCategories = transactionCategories[formData.type] || []

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type */}
          <div className="space-y-3">
            <Label>Transaction Type *</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => handleChange("type", value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit" className="text-accent">
                  Credit (Money In)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debit" id="debit" />
                <Label htmlFor="debit" className="text-destructive">
                  Debit (Money Out)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className="bg-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="bg-input"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              placeholder="What is this transaction for?"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="bg-input"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fromTo">{formData.type === "credit" ? "From (Source) *" : "To (Recipient) *"}</Label>
            <Input
              id="fromTo"
              placeholder={formData.type === "credit" ? "Who paid you?" : "Who did you pay?"}
              value={formData.fromTo}
              onChange={(e) => handleChange("fromTo", e.target.value)}
              className="bg-input"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">Account *</Label>
              <Select value={formData.account} onValueChange={(value) => handleChange("account", value)}>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Account</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => handleChange("paymentMethod", value)}>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="debit-card">Debit Card</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="digital-wallet">Digital Wallet</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="wire-transfer">Wire Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Reference Number</Label>
              <Input
                id="reference"
                placeholder="Transaction ID, Check #, etc."
                value={formData.reference}
                onChange={(e) => handleChange("reference", e.target.value)}
                className="bg-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes (optional)"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="bg-input"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              Add Transaction
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
