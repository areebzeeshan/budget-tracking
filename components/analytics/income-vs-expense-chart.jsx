"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

export default function IncomeVsExpenseChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses Trend</CardTitle>
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
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-2))", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="hsl(var(--chart-5))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-5))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-5))", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-3))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
