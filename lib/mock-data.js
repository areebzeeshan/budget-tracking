export const mockUser = {
  id: "demo-user-123",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/diverse-user-avatars.png",
}

export const mockAccounts = {
  current: {
    balance: 15750.5,
    accountNumber: "****1234",
    type: "Current Account",
  },
  savings: {
    balance: 45200.75,
    accountNumber: "****5678",
    type: "Savings Account",
  },
}

export const mockExpenses = [
  {
    id: "exp-1",
    amount: 85.5,
    category: "Food & Dining",
    description: "Grocery shopping at Whole Foods",
    date: "2024-01-15",
    type: "expense",
  },
  {
    id: "exp-2",
    amount: 1200.0,
    category: "Housing",
    description: "Monthly rent payment",
    date: "2024-01-01",
    type: "expense",
  },
  {
    id: "exp-3",
    amount: 45.25,
    category: "Transportation",
    description: "Gas station fill-up",
    date: "2024-01-14",
    type: "expense",
  },
  {
    id: "exp-4",
    amount: 120.0,
    category: "Utilities",
    description: "Electricity bill",
    date: "2024-01-10",
    type: "expense",
  },
  {
    id: "exp-5",
    amount: 65.8,
    category: "Entertainment",
    description: "Movie tickets and snacks",
    date: "2024-01-12",
    type: "expense",
  },
]

export const mockTransactions = [
  {
    id: "txn-1",
    amount: 3500.0,
    type: "credit",
    category: "Salary",
    description: "Monthly salary deposit",
    from: "ABC Company Ltd",
    to: "Current Account",
    date: "2024-01-01",
    status: "completed",
  },
  {
    id: "txn-2",
    amount: 1200.0,
    type: "debit",
    category: "Housing",
    description: "Rent payment",
    from: "Current Account",
    to: "Property Management Co",
    date: "2024-01-01",
    status: "completed",
  },
  {
    id: "txn-3",
    amount: 500.0,
    type: "transfer",
    category: "Savings",
    description: "Transfer to savings",
    from: "Current Account",
    to: "Savings Account",
    date: "2024-01-05",
    status: "completed",
  },
  {
    id: "txn-4",
    amount: 85.5,
    type: "debit",
    category: "Food & Dining",
    description: "Grocery shopping",
    from: "Current Account",
    to: "Whole Foods Market",
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "txn-5",
    amount: 2000.0,
    type: "credit",
    category: "Freelance",
    description: "Freelance project payment",
    from: "XYZ Client",
    to: "Current Account",
    date: "2024-01-10",
    status: "completed",
  },
]

export const mockAnalytics = {
  monthlySpending: [
    { month: "Jan", amount: 2850 },
    { month: "Feb", amount: 3200 },
    { month: "Mar", amount: 2950 },
    { month: "Apr", amount: 3100 },
    { month: "May", amount: 2800 },
    { month: "Jun", amount: 3350 },
  ],
  categoryBreakdown: [
    { category: "Housing", amount: 1200, percentage: 35 },
    { category: "Food & Dining", amount: 650, percentage: 19 },
    { category: "Transportation", amount: 450, percentage: 13 },
    { category: "Utilities", amount: 300, percentage: 9 },
    { category: "Entertainment", amount: 250, percentage: 7 },
    { category: "Others", amount: 580, percentage: 17 },
  ],
  incomeVsExpense: [
    { month: "Jan", income: 5500, expense: 2850 },
    { month: "Feb", income: 5500, expense: 3200 },
    { month: "Mar", income: 5500, expense: 2950 },
    { month: "Apr", income: 5500, expense: 3100 },
    { month: "May", income: 5500, expense: 2800 },
    { month: "Jun", income: 5500, expense: 3350 },
  ],
}
