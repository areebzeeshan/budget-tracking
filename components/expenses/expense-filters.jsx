"use client"

import { useDispatch, useSelector } from "react-redux"
import { setFilters } from "../../redux/slices/transactionSlice"
import { Card, CardContent } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Filter, Search } from "lucide-react"

const expenseCategories = [
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
  "Business",
  "Other",
]

export default function ExpenseFilters() {
  const dispatch = useDispatch()
  const { filters } = useSelector((state) => state.transaction)

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }))
  }

  const clearFilters = () => {
    dispatch(
      setFilters({
        dateRange: "all",
        category: "all",
        type: "all",
      }),
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="w-48 bg-input">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {expenseCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
            <SelectTrigger className="w-48 bg-input">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search expenses..." className="w-48 bg-input" />
          </div>

          <Button variant="outline" size="sm" onClick={clearFilters} className="bg-transparent">
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
