"use client";

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { initAuth, initializeAuthListener, cleanupAuthListener } from '../../redux/slices/authSlice';
import { fetchAccounts } from '../../redux/slices/accountSlice';
import { fetchTransactions } from '../../redux/slices/transactionSlice';
import { useEffect, useState } from 'react';

// Component to initialize app data
const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading: isAuthLoading } = useSelector((state) => state.auth);
  const [initialized, setInitialized] = useState(false);

    // Initialize auth state
  useEffect(() => {
    let isMounted = true;
    
    const initializeAuth = async () => {
      try {
        dispatch(initAuth());
        // Pass dispatch to the auth listener
        await initializeAuthListener()(dispatch);
        if (isMounted) {
          setInitialized(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (isMounted) {
          setInitialized(true);
        }
      }
    };
    
    initializeAuth();
    
    return () => {
      isMounted = false;
      cleanupAuthListener();
    };
  }, [dispatch]);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated && user?.uid) {
      // These would need to be updated to not use thunks as well
      // For now, we'll just log that we would fetch the data
      console.log('Would fetch accounts and transactions for user:', user.uid);
      // dispatch(fetchAccounts(user.uid));
      // dispatch(fetchTransactions(user.uid));
    }
  }, [isAuthenticated, user?.uid]);

  // Show loading state only while initializing
  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
}
