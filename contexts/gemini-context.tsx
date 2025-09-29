// TODO: Delete this, it is an example
// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
  reload, // Import reload to refresh user data
  deleteUser, // Import deleteUser to remove unverified users
} from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import your Firebase auth instance
import { useMutation } from 'react-query'; // For custom API interaction

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase User object
  const [loading, setLoading] = useState(true); // Initial loading state for auth check
  const [isEmailVerificationPending, setIsEmailVerificationPending] = useState(false); // State to manage email verification flow
  const [isUserCreatedInAPI, setIsUserCreatedInAPI] = useState(false); // State to track if user is created in custom API
  const emailVerificationIntervalRef = useRef(null); // Ref to hold the interval for email verification checks

  // --- React Query Mutation for Custom API User Creation ---
  // Replace this with your actual API endpoint and logic
  const createUserInApiMutation = useMutation(
    async (firebaseUid) => {
      // Simulate an API call to your backend
      console.log(`Attempting to create user in custom API for UID: ${firebaseUid}`);
      const response = await fetch('https://your-custom-api.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You might send a Firebase ID token for verification on your backend
          // 'Authorization': `Bearer ${await auth.currentUser.getIdToken()}`
        },
        body: JSON.stringify({ firebaseUid, email: auth.currentUser.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user in custom API');
      }
      return response.json();
    },
    {
      onSuccess: (data) => {
        console.log('User successfully created in custom API:', data);
        setIsUserCreatedInAPI(true); // Mark user as created in custom API
      },
      onError: (error) => {
        console.error('Error creating user in custom API:', error.message);
        // Handle error, e.g., show a message to the user
        setIsUserCreatedInAPI(false); // Ensure this is false on error
      },
    },
  );

  // --- Firebase Auth Actions ---

  // Sign up a new user with email and password
  const signUp = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Firebase user created:', userCredential.user.uid);

      // Immediately send email verification
      await sendEmailVerification(userCredential.user);
      console.log('Email verification sent.');

      setIsEmailVerificationPending(true); // Set pending state
      setUser(userCredential.user); // Update user state

      // Start polling for email verification status
      startEmailVerificationPolling(userCredential.user);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Error signing up:', error.message);
      setIsEmailVerificationPending(false); // Reset pending state on error
      setLoading(false);
      throw error; // Re-throw to be caught by UI
    }
  };

  // Sign in an existing user
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user.uid);

      // If user is signed in, check if email is verified and if user exists in custom API
      if (userCredential.user.emailVerified) {
        // If email is verified, check/create user in custom API
        await createUserInApiMutation.mutateAsync(userCredential.user.uid);
      } else {
        // If email not verified, prompt them to verify
        setIsEmailVerificationPending(true);
        startEmailVerificationPolling(userCredential.user);
      }

      setUser(userCredential.user);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Error signing in:', error.message);
      setLoading(false);
      throw error;
    }
  };

  // Sign out the current user
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsEmailVerificationPending(false);
      setIsUserCreatedInAPI(false);
      stopEmailVerificationPolling();
      console.log('User signed out.');
    } catch (error) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  };

  // Resend email verification
  const resendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        console.log('Verification email re-sent.');
        // Optionally, restart polling if it was stopped
        startEmailVerificationPolling(auth.currentUser);
        return { success: true };
      } catch (error) {
        console.error('Error re-sending verification email:', error.message);
        throw error;
      }
    } else {
      console.warn('No current user to send verification email to.');
      throw new Error('No active user session.');
    }
  };

  // Cancel email verification flow and delete the unverified Firebase user
  const cancelEmailVerification = async () => {
    stopEmailVerificationPolling(); // Stop polling
    setIsEmailVerificationPending(false); // Reset pending state

    if (user && !user.emailVerified) {
      try {
        // Delete the Firebase user if they haven't verified their email
        await deleteUser(user);
        setUser(null); // Clear user state
        setIsUserCreatedInAPI(false); // Ensure this is false
        console.log('Unverified user account deleted.');
        return { success: true, message: 'Account creation cancelled.' };
      } catch (error) {
        console.error('Error deleting unverified user:', error.message);
        // If deletion fails (e.g., auth/requires-recent-login), inform the user
        throw new Error('Could not delete account. Please try again or sign in to delete.');
      }
    } else {
      console.log('No unverified user to cancel for.');
      return { success: false, message: 'No unverified user to cancel.' };
    }
  };

  // --- Email Verification Polling Logic ---

  // Function to start polling for email verification status
  const startEmailVerificationPolling = (currentUser) => {
    stopEmailVerificationPolling(); // Clear any existing interval
    emailVerificationIntervalRef.current = setInterval(async () => {
      try {
        // Reload the user's token to get the latest emailVerified status
        await reload(currentUser);
        if (currentUser.emailVerified) {
          console.log('Email successfully verified!');
          stopEmailVerificationPolling(); // Stop polling
          setIsEmailVerificationPending(false); // Reset pending state

          // Once email is verified, create user in your custom API
          await createUserInApiMutation.mutateAsync(currentUser.uid);
        } else {
          console.log('Email not yet verified, waiting...');
        }
      } catch (error) {
        console.error('Error reloading user for verification check:', error.message);
        // If there's an error (e.g., user deleted), stop polling
        stopEmailVerificationPolling();
        setIsEmailVerificationPending(false);
        setUser(null); // Clear user state if reload fails
      }
    }, 3000); // Check every 3 seconds
  };

  // Function to stop polling
  const stopEmailVerificationPolling = () => {
    if (emailVerificationIntervalRef.current) {
      clearInterval(emailVerificationIntervalRef.current);
      emailVerificationIntervalRef.current = null;
    }
  };

  // --- Auth State Listener ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false); // Auth state check complete

      if (firebaseUser) {
        // If user is logged in, check their email verification status
        if (!firebaseUser.emailVerified) {
          setIsEmailVerificationPending(true);
          startEmailVerificationPolling(firebaseUser);
        } else {
          setIsEmailVerificationPending(false);
          stopEmailVerificationPolling(); // Ensure polling is stopped if already verified
          // If email is verified, check if they exist in custom API
          // This ensures existing verified users also get created in API if not already
          if (!isUserCreatedInAPI) {
            // Only try to create if not already created in this session
            await createUserInApiMutation.mutateAsync(firebaseUser.uid);
          }
        }
      } else {
        // No user logged in
        setIsEmailVerificationPending(false);
        setIsUserCreatedInAPI(false);
        stopEmailVerificationPolling();
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [isUserCreatedInAPI]); // Re-run effect if isUserCreatedInAPI changes to ensure API creation logic

  // Provide auth state and actions to children
  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOutUser,
    resendVerificationEmail,
    cancelEmailVerification,
    isEmailVerificationPending,
    isUserCreatedInAPI,
    createUserInApiLoading: createUserInApiMutation.isLoading,
    createUserInApiError: createUserInApiMutation.error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only after initial auth check */}
    </AuthContext.Provider>
  );
};
