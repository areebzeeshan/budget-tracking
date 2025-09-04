const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}

// Action types
export const AUTH_SET_LOADING = "auth/setLoading"
export const AUTH_SET_USER = "auth/setUser"
export const AUTH_SET_ERROR = "auth/setError"
export const AUTH_CLEAR_ERROR = "auth/clearError"
export const AUTH_LOGOUT = "auth/logout"

// Action creators
export const setLoading = (payload) => ({ type: AUTH_SET_LOADING, payload })
export const setUser = (payload) => ({ type: AUTH_SET_USER, payload })
export const setError = (payload) => ({ type: AUTH_SET_ERROR, payload })
export const clearError = () => ({ type: AUTH_CLEAR_ERROR })
export const logout = () => ({ type: AUTH_LOGOUT })

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_LOADING:
      return { ...state, isLoading: action.payload }
    case AUTH_SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null,
      }
    case AUTH_SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    case AUTH_CLEAR_ERROR:
      return { ...state, error: null }
    case AUTH_LOGOUT:
      return { ...state, user: null, isAuthenticated: false, error: null }
    default:
      return state
  }
}

export default authReducer
