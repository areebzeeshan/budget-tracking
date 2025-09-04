"use client"

import { useDispatch, useSelector } from "react-redux"
import { setFilters } from "../../redux/slices/transactionSlice"
import { Card, CardContent } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Filter, Search, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function TransactionFilters() {
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

          <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger className="w-48 bg-input">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="credit">
                <div className="flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-accent" />
                  <span>Credits (Money In)</span>
                </div>
              </SelectItem>
              <SelectItem value="debit">
                <div className="flex items-center space-x-2">
                  <ArrowDownRight className="h-4 w-4 text-destructive" />
                  <span>Debits (Money Out)</span>
                </div>
              </SelectItem>
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
            <Input placeholder="Search transactions..." className="w-48 bg-input" />
          </div>

          <Button variant="outline" size="sm" onClick={clearFilters} className="bg-transparent">
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
