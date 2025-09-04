"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

// Initial state
const initialState = {
  auth: {
    user: null,
    isAuthenticated: false,
    loading: true,
  },
  accounts: {
    current: 0,
    savings: 0,
  },
  transactions: [],
  expenses: [],
}

// Action types
const ActionTypes = {
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
  SET_LOADING: "SET_LOADING",
  UPDATE_ACCOUNT: "UPDATE_ACCOUNT",
  ADD_TRANSACTION: "ADD_TRANSACTION",
  ADD_EXPENSE: "ADD_EXPENSE",
  SET_TRANSACTIONS: "SET_TRANSACTIONS",
  SET_EXPENSES: "SET_EXPENSES",
}

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        auth: {
          user: action.payload,
          isAuthenticated: !!action.payload,
          loading: false,
        },
      }
    case ActionTypes.LOGOUT:
      return {
        ...state,
        auth: {
          user: null,
          isAuthenticated: false,
          loading: false,
        },
      }
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: action.payload,
        },
      }
    case ActionTypes.UPDATE_ACCOUNT:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [action.payload.type]: action.payload.amount,
        },
      }
    case ActionTypes.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      }
    case ActionTypes.ADD_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      }
    case ActionTypes.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      }
    case ActionTypes.SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      }
    default:
      return state
  }
}

// Context
const AppContext = createContext()

// Provider component
export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load demo data on mount
  useEffect(() => {
    const demoUser = localStorage.getItem("demoUser")
    if (demoUser) {
      dispatch({ type: ActionTypes.SET_USER, payload: JSON.parse(demoUser) })

      // Load demo accounts
      dispatch({ type: ActionTypes.UPDATE_ACCOUNT, payload: { type: "current", amount: 15420.5 } })
      dispatch({ type: ActionTypes.UPDATE_ACCOUNT, payload: { type: "savings", amount: 8750.25 } })

      // Load demo transactions
      const demoTransactions = [
        {
          id: 1,
          type: "credit",
          amount: 3500,
          description: "Salary",
          category: "Income",
          from: "Company ABC",
          date: new Date().toISOString(),
        },
        {
          id: 2,
          type: "debit",
          amount: 1200,
          description: "Rent Payment",
          category: "Housing",
          to: "Landlord",
          date: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 3,
          type: "credit",
          amount: 500,
          description: "Freelance Work",
          category: "Income",
          from: "Client XYZ",
          date: new Date(Date.now() - 172800000).toISOString(),
        },
      ]
      dispatch({ type: ActionTypes.SET_TRANSACTIONS, payload: demoTransactions })

      // Load demo expenses
      const demoExpenses = [
        { id: 1, amount: 45.5, description: "Groceries", category: "Food", date: new Date().toISOString() },
        {
          id: 2,
          amount: 25.0,
          description: "Gas",
          category: "Transportation",
          date: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 3,
          amount: 12.99,
          description: "Netflix",
          category: "Entertainment",
          date: new Date(Date.now() - 172800000).toISOString(),
        },
      ]
      dispatch({ type: ActionTypes.SET_EXPENSES, payload: demoExpenses })
    } else {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false })
    }
  }, [])

  const value = {
    state,
    dispatch,
    ActionTypes,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
