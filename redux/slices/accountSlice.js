const initialState = {
  currentAccount: {
    balance: 0,
    currency: "USD",
  },
  savingsAccount: {
    balance: 0,
    currency: "USD",
  },
  totalBalance: 0,
  isLoading: false,
  error: null,
}

// Action types
export const ACCOUNT_SET_LOADING = "account/setLoading"
export const ACCOUNT_SET_CURRENT = "account/setCurrentAccount"
export const ACCOUNT_SET_SAVINGS = "account/setSavingsAccount"
export const ACCOUNT_UPDATE_BALANCE = "account/updateBalance"
export const ACCOUNT_SET_ERROR = "account/setError"

// Action creators
export const setLoading = (payload) => ({ type: ACCOUNT_SET_LOADING, payload })
export const setCurrentAccount = (payload) => ({ type: ACCOUNT_SET_CURRENT, payload })
export const setSavingsAccount = (payload) => ({ type: ACCOUNT_SET_SAVINGS, payload })
export const updateBalance = (payload) => ({ type: ACCOUNT_UPDATE_BALANCE, payload })
export const setError = (payload) => ({ type: ACCOUNT_SET_ERROR, payload })

// Reducer
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_SET_LOADING:
      return { ...state, isLoading: action.payload }
    case ACCOUNT_SET_CURRENT:
      return {
        ...state,
        currentAccount: action.payload,
        totalBalance: action.payload.balance + state.savingsAccount.balance,
      }
    case ACCOUNT_SET_SAVINGS:
      return {
        ...state,
        savingsAccount: action.payload,
        totalBalance: state.currentAccount.balance + action.payload.balance,
      }
    case ACCOUNT_UPDATE_BALANCE:
      const { accountType, amount } = action.payload
      const newState = { ...state }
      if (accountType === "current") {
        newState.currentAccount = { ...state.currentAccount, balance: state.currentAccount.balance + amount }
      } else if (accountType === "savings") {
        newState.savingsAccount = { ...state.savingsAccount, balance: state.savingsAccount.balance + amount }
      }
      newState.totalBalance = newState.currentAccount.balance + newState.savingsAccount.balance
      return newState
    case ACCOUNT_SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
}

export default accountReducer
