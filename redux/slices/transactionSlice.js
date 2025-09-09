import { 
  getTransactionsCollection, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp 
} from '@/lib/firebase';

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
  unsubscribe: null, // To store the Firestore unsubscribe function
};

// Action types
export const TRANSACTION_SET_LOADING = "transaction/setLoading"
export const TRANSACTION_SET_TRANSACTIONS = "transaction/setTransactions"
export const TRANSACTION_ADD_TRANSACTION = "transaction/addTransaction"
export const TRANSACTION_UPDATE_TRANSACTION = "transaction/updateTransaction"
export const TRANSACTION_DELETE_TRANSACTION = "transaction/deleteTransaction"
export const TRANSACTION_SET_ERROR = "transaction/setError"
export const TRANSACTION_SET_UNSUBSCRIBE = "transaction/setUnsubscribe"
export const TRANSACTION_CLEAR = "transaction/clear"

// Action creators
export const setLoading = (payload) => ({ type: TRANSACTION_SET_LOADING, payload })
export const setTransactions = (payload) => ({ type: TRANSACTION_SET_TRANSACTIONS, payload })
export const addTransaction = (payload) => ({ type: TRANSACTION_ADD_TRANSACTION, payload })
export const updateTransactionAction = (payload) => ({ type: TRANSACTION_UPDATE_TRANSACTION, payload })
export const deleteTransaction = (payload) => ({ type: TRANSACTION_DELETE_TRANSACTION, payload })
export const setError = (payload) => ({ type: TRANSACTION_SET_ERROR, payload })
export const setUnsubscribe = (payload) => ({ type: TRANSACTION_SET_UNSUBSCRIBE, payload })
export const clearTransactions = () => ({ type: TRANSACTION_CLEAR })

// Thunks
export const fetchTransactions = (userId) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    
    // Unsubscribe from previous listener if it exists
    const { unsubscribe: prevUnsubscribe } = getState().transaction;
    if (prevUnsubscribe) prevUnsubscribe();

    const transactionsQuery = query(
      getTransactionsCollection(userId),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(transactionsQuery, (querySnapshot) => {
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore Timestamp to Date if needed
          date: doc.data().date?.toDate ? doc.data().date.toDate() : doc.data().date
        });
      });
      dispatch(setTransactions(transactions));
    }, (error) => {
      console.error("Error fetching transactions:", error);
      dispatch(setError(error.message));
    });

    dispatch(setUnsubscribe(unsubscribe));
    
  } catch (error) {
    console.error("Error in fetchTransactions:", error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTransaction = (userId, transactionData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    
    const newTransaction = {
      ...transactionData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(getTransactionsCollection(userId), newTransaction);
    
    return {
      id: docRef.id,
      ...newTransaction
    };
  } catch (error) {
    console.error("Error creating transaction:", error);
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateTransaction = (userId, transactionId, updates) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    
    const transactionRef = doc(getTransactionsCollection(userId), transactionId);
    
    await updateDoc(transactionRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    
  } catch (error) {
    console.error("Error updating transaction:", error);
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeTransaction = (userId, transactionId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    
    const transactionRef = doc(getTransactionsCollection(userId), transactionId);
    await deleteDoc(transactionRef);
    
  } catch (error) {
    console.error("Error deleting transaction:", error);
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Reducer
export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_SET_LOADING:
      return { ...state, isLoading: action.payload };
      
    case TRANSACTION_SET_TRANSACTIONS:
      return { 
        ...state, 
        transactions: action.payload,
        // Separate expenses from transactions if needed
        expenses: action.payload.filter(t => t.type === 'expense')
      };
      
    case TRANSACTION_ADD_TRANSACTION:
      return { 
        ...state, 
        transactions: [action.payload, ...state.transactions] 
      };
      
    case TRANSACTION_UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(tx => 
          tx.id === action.payload.id ? { ...tx, ...action.payload } : tx
        )
      };
      
    case TRANSACTION_DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(tx => tx.id !== action.payload)
      };
      
    case TRANSACTION_SET_ERROR:
      return { ...state, error: action.payload };
      
    case TRANSACTION_SET_UNSUBSCRIBE:
      return { ...state, unsubscribe: action.payload };
      
    case TRANSACTION_CLEAR:
      if (state.unsubscribe) state.unsubscribe();
      return { ...initialState };
      
    default:
      return state;
  }
}
