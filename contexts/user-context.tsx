import { createContext, useContext } from 'react';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { User } from '@/shapes';
import { useUser } from '@/hooks';

type UserContextType = {
  user: User | null;
  idToken: string | null;
  setUser: (user: User | null) => void;
  logOut: () => void;
  logIn: (user: User) => void;
  isLoggedIn: boolean;
};

const defaultUserContextValue: UserContextType = {
  user: null,
  idToken: null,
  setUser: () => {},
  logOut: () => {},
  logIn: () => {},
  isLoggedIn: false,
};

const UserContext = createContext<UserContextType>(defaultUserContextValue);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const { data, isSuccess } = useUser({ userId: userId ?? '' });

  // Handle user state changes
  const handleAuthStateChanged = useCallback(
    async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        setIdToken(await fbUser.getIdToken());
        setUserId(fbUser.uid);
      }
      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [handleAuthStateChanged]);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [data, isSuccess]);

  if (initializing) return <></>;
  const UserContextValue: UserContextType = {
    user,
    idToken: idToken,
    setUser,
    isLoggedIn: !!user,
    // TODO: Wire up the log in and out functions
    logOut: () => setUser(null),
    logIn: (user: User) => setUser(user),
  };
  return <UserContext.Provider value={UserContextValue}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  return useContext(UserContext);
}
