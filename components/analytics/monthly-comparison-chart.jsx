"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

export default function MonthlyComparisonChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            income: {
              label: "Income",
              color: "hsl(var(--chart-2))",
            },
            expenses: {
              label: "Expenses",
              color: "hsl(var(--chart-5))",
            },
            savings: {
              label: "Savings",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="income" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="hsl(var(--chart-5))" radius={[2, 2, 0, 0]} name="Expenses" />
              <Bar dataKey="savings" fill="hsl(var(--chart-3))" radius={[2, 2, 0, 0]} name="Savings" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
