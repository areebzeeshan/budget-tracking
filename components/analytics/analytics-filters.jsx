"use client"

import { Card, CardContent } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Calendar, Filter, Download } from "lucide-react"

export default function AnalyticsFilters() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <Select defaultValue="6months">
            <SelectTrigger className="w-48 bg-input">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-48 bg-input">
              <SelectValue placeholder="Account Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              <SelectItem value="current">Current Account</SelectItem>
              <SelectItem value="savings">Savings Account</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Date
          </Button>

          <Button variant="outline" size="sm" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
