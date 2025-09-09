import { 
  auth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseSignUp,
  signOut as firebaseSignOut,
} from '@/lib/firebase';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Action types
export const AUTH_SET_LOADING = 'auth/setLoading';
export const AUTH_SET_USER = 'auth/setUser';
export const AUTH_SET_ERROR = 'auth/setError';
export const AUTH_CLEAR_ERROR = 'auth/clearError';

// Action creators
export const setLoading = (payload) => ({ type: AUTH_SET_LOADING, payload });
export const setUser = (payload) => ({ type: AUTH_SET_USER, payload });
export const setError = (payload) => ({ type: AUTH_SET_ERROR, payload });
export const clearError = () => ({ type: AUTH_CLEAR_ERROR });

// Thunks
export const signIn = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { user } = await firebaseSignIn(auth, email, password);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || email.split('@')[0],
    };
    dispatch(setUser(userData));
    return userData;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const signUp = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { user } = await firebaseSignUp(auth, email, password);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: email.split('@')[0],
    };
    dispatch(setUser(userData));
    return userData;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const signOut = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await firebaseSignOut(auth);
    dispatch({ type: 'auth/signOut' });
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Auth state management without thunks
let unsubscribe = null;

export const initAuth = () => ({
  type: AUTH_SET_LOADING,
  payload: true
});

export const initializeAuthListener = () => (dispatch) => {
  return new Promise((resolve) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
        };
        dispatch(setUser(userData));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
      resolve();
    });
  });
};

export const cleanupAuthListener = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_LOADING:
      return { ...state, isLoading: action.payload };
      
    case AUTH_SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null,
      };
      
    case AUTH_SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
      
    case AUTH_CLEAR_ERROR:
      return { ...state, error: null };
      
    case 'auth/signOut':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        error: null,
        isLoading: false,
      };
      
    default:
      return state;
  }
};

export default authReducer
