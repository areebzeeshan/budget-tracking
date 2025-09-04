"use client"

import { useEffect } from "react"
import { onAuthStateChanged } from "../lib/firebase"
import { useAppContext } from "../components/providers/app-provider"

export function useAuth() {
  const { state, dispatch, ActionTypes } = useAppContext()
  const { user, loading: isLoading, isAuthenticated } = state.auth

  useEffect(() => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true })

    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: ActionTypes.SET_USER,
          payload: {
            uid: user.uid,
            email: user.email,
          },
        })
      } else {
        dispatch({ type: ActionTypes.SET_USER, payload: null })
      }
    })

    return () => unsubscribe()
  }, [dispatch, ActionTypes])

  return { user, isLoading, isAuthenticated }
}
