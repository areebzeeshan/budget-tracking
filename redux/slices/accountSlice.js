import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot,
  serverTimestamp,
  getAccountsCollection,
  getDocRef
} from '@/lib/firebase';

const initialState = {
  currentAccount: {
    balance: 0,
    currency: "USD",
    name: "Current Account",
    type: 'current',
    createdAt: null,
    updatedAt: null,
  },
  savingsAccount: {
    balance: 0,
    currency: "USD",
    name: "Savings Account",
    type: 'savings',
    createdAt: null,
    updatedAt: null,
  },
  totalBalance: 0,
  isLoading: false,
  error: null,
  unsubscribe: null,
};

// Action types
export const ACCOUNT_SET_LOADING = "account/setLoading";
export const ACCOUNT_SET_CURRENT = "account/setCurrentAccount";
export const ACCOUNT_SET_SAVINGS = "account/setSavingsAccount";
export const ACCOUNT_UPDATE_BALANCE = "account/updateBalance";
export const ACCOUNT_SET_ERROR = "account/setError";
export const ACCOUNT_SET_UNSUBSCRIBE = "account/setUnsubscribe";

// Action creators
export const setLoading = (payload) => ({ type: ACCOUNT_SET_LOADING, payload });
export const setCurrentAccount = (payload) => ({ type: ACCOUNT_SET_CURRENT, payload });
export const setSavingsAccount = (payload) => ({ type: ACCOUNT_SET_SAVINGS, payload });
export const updateBalance = (payload) => ({ type: ACCOUNT_UPDATE_BALANCE, payload });
export const setError = (payload) => ({ type: ACCOUNT_SET_ERROR, payload });
export const setUnsubscribe = (payload) => ({ type: ACCOUNT_SET_UNSUBSCRIBE, payload });

// Thunks
export const fetchAccounts = (userId) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    
    // Unsubscribe from previous listener if it exists
    const { unsubscribe: prevUnsubscribe } = getState().account;
    if (prevUnsubscribe) prevUnsubscribe();
    
    const accountsRef = getAccountsCollection(userId);
    const accountsQuery = query(accountsRef, where('userId', '==', userId));
    
    const unsubscribe = onSnapshot(accountsQuery, (querySnapshot) => {
      let currentAccount = { ...initialState.currentAccount };
      let savingsAccount = { ...initialState.savingsAccount };
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const account = {
          id: doc.id,
          ...data,
          balance: data.balance || 0,
          currency: data.currency || 'USD',
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        };
        
        if (data.type === 'current') {
          currentAccount = account;
        } else if (data.type === 'savings') {
          savingsAccount = account;
        }
      });
      
      dispatch(setCurrentAccount(currentAccount));
      dispatch(setSavingsAccount(savingsAccount));
    }, (error) => {
      console.error("Error fetching accounts:", error);
      dispatch(setError(error.message));
    });
    
    dispatch(setUnsubscribe(unsubscribe));
    
  } catch (error) {
    console.error("Error in fetchAccounts:", error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateAccountBalance = (userId, accountType, amount) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    
    const { account } = getState();
    const accountData = account[`${accountType}Account`];
    const newBalance = (accountData.balance || 0) + amount;
    
    let accountRef;
    
    if (accountData.id) {
      // Update existing account
      accountRef = doc(getAccountsCollection(userId), accountData.id);
      await updateDoc(accountRef, {
        balance: newBalance,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create new account if it doesn't exist
      const newAccount = {
        ...accountData,
        balance: newBalance,
        userId,
        type: accountType,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(getAccountsCollection(userId), newAccount);
      accountRef = doc(getAccountsCollection(userId), docRef.id);
      
      // Update local state with the new account ID
      if (accountType === 'current') {
        dispatch(setCurrentAccount({ ...newAccount, id: docRef.id }));
      } else {
        dispatch(setSavingsAccount({ ...newAccount, id: docRef.id }));
      }
    }
    
    return newBalance;
    
  } catch (error) {
    console.error("Error updating account balance:", error);
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Reducer
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_SET_LOADING:
      return { ...state, isLoading: action.payload };
      
    case ACCOUNT_SET_CURRENT:
      return {
        ...state,
        currentAccount: action.payload,
        totalBalance: (action.payload.balance || 0) + (state.savingsAccount?.balance || 0),
      };
      
    case ACCOUNT_SET_SAVINGS:
      return {
        ...state,
        savingsAccount: action.payload,
        totalBalance: (state.currentAccount?.balance || 0) + (action.payload.balance || 0),
      };
      
    case ACCOUNT_UPDATE_BALANCE: {
      const { accountType, amount } = action.payload;
      const newState = { ...state };
      
      if (accountType === "current") {
        const newBalance = (newState.currentAccount.balance || 0) + amount;
        newState.currentAccount = { 
          ...newState.currentAccount, 
          balance: newBalance 
        };
        newState.totalBalance = newBalance + (newState.savingsAccount?.balance || 0);
      } else {
        const newBalance = (newState.savingsAccount.balance || 0) + amount;
        newState.savingsAccount = { 
          ...newState.savingsAccount, 
          balance: newBalance 
        };
        newState.totalBalance = (newState.currentAccount?.balance || 0) + newBalance;
      }
      
      return newState;
    }
    
    case ACCOUNT_SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
      
    case ACCOUNT_SET_UNSUBSCRIBE:
      return { ...state, unsubscribe: action.payload };
      
    case 'auth/signOut':
      // Clean up listeners and reset state on sign out
      if (state.unsubscribe) state.unsubscribe();
      return { 
        ...initialState,
        unsubscribe: null,
      };
      
    default:
      return state;
  }
};

export default accountReducer
