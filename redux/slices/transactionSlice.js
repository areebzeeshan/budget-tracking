const initialState = {
  transactions: [],
  expenses: [],
  monthlyStatement: null,
  isLoading: false,
  error: null,
  filters: {
    dateRange: "all",
    category: "all",
    type: "all",
  },
}

// Action types
export const TRANSACTION_SET_LOADING = "transaction/setLoading"
export const TRANSACTION_SET_TRANSACTIONS = "transaction/setTransactions"
export const TRANSACTION_ADD_TRANSACTION = "transaction/addTransaction"
export const TRANSACTION_SET_EXPENSES = "transaction/setExpenses"
export const TRANSACTION_ADD_EXPENSE = "transaction/addExpense"
export const TRANSACTION_SET_MONTHLY_STATEMENT = "transaction/setMonthlyStatement"
export const TRANSACTION_SET_FILTERS = "transaction/setFilters"
export const TRANSACTION_SET_ERROR = "transaction/setError"

// Action creators
export const setLoading = (payload) => ({ type: TRANSACTION_SET_LOADING, payload })
export const setTransactions = (payload) => ({ type: TRANSACTION_SET_TRANSACTIONS, payload })
export const addTransaction = (payload) => ({ type: TRANSACTION_ADD_TRANSACTION, payload })
export const setExpenses = (payload) => ({ type: TRANSACTION_SET_EXPENSES, payload })
export const addExpense = (payload) => ({ type: TRANSACTION_ADD_EXPENSE, payload })
export const setMonthlyStatement = (payload) => ({ type: TRANSACTION_SET_MONTHLY_STATEMENT, payload })
export const setFilters = (payload) => ({ type: TRANSACTION_SET_FILTERS, payload })
export const setError = (payload) => ({ type: TRANSACTION_SET_ERROR, payload })

// Reducer
const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_SET_LOADING:
      return { ...state, isLoading: action.payload }
    case TRANSACTION_SET_TRANSACTIONS:
      return { ...state, transactions: action.payload }
    case TRANSACTION_ADD_TRANSACTION:
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case TRANSACTION_SET_EXPENSES:
      return { ...state, expenses: action.payload }
    case TRANSACTION_ADD_EXPENSE:
      return { ...state, expenses: [action.payload, ...state.expenses] }
    case TRANSACTION_SET_MONTHLY_STATEMENT:
      return { ...state, monthlyStatement: action.payload }
    case TRANSACTION_SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case TRANSACTION_SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
}

export default transactionReducer
