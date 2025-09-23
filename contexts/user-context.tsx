import { createContext, useContext, useMemo } from 'react';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  deleteUser as firebaseDeleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  User as FirebaseUser,
  ActionCodeSettings,
} from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { AuthorizedApiRequest, LogInProps, User, UserBase, UserCreateProps } from '@/shapes';
import { useUser } from '@/hooks';
import { useCreateUser, useDeleteUser } from '../hooks/api/useUser';
import Constants from 'expo-constants';

type UserContextType = {
  user?: User;
  idToken: string | null;
  logOut: () => void;
  logIn: (props: LogInProps) => Promise<void>;
  createUser: (props: UserCreateProps) => Promise<void>;
  cancelCreateUser: () => Promise<void>;
  deleteUser: () => void;
  isLoggedIn: boolean;
  isAnonymous: boolean;
  // TODO: Use this to add guard clause in auth flow, and add page for waiting for email verification
  // before allowing user to log in as well as have a way to abort/redirect/resend verification email
  isEmailVerificationPending: boolean;
};

// TODO: Actually get this to work...
const actionCodeSettings: ActionCodeSettings = {
  // TODO hard coding for development for now...
  url: 'http://localhost:9099',
  handleCodeInApp: true,
  iOS: {
    bundleId: Constants.expoConfig?.ios?.bundleIdentifier || 'com.r0m4n.ama',
  },
  android: {
    packageName: Constants.expoConfig?.android?.package || 'com.r0m4n.ama',
    installApp: true,
  },
  // TODO: Find out if this is the thing or if it is something else
  dynamicLinkDomain: Constants.linkingUri,
};

const defaultUserContextValue: UserContextType = {
  idToken: null,
  logOut: () => {},
  logIn: async () => {},
  createUser: async () => {},
  cancelCreateUser: async () => {},
  deleteUser: () => {},
  isLoggedIn: false,
  isAnonymous: true,
  isEmailVerificationPending: false,
};

const UserContext = createContext<UserContextType>(defaultUserContextValue);

// For the create user flow... need to queue the user to create, verify their email, and then
// create the user in the backend, or to just create the user and then delete it if it is not verified?

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [isAnonymous, setIsAnonymous] = useState<boolean>(defaultUserContextValue.isAnonymous);
  const [userId, setUserId] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isEmailVerificationPending, setIsEmailVerificationPending] = useState<boolean>(false);
  // TODO: Get this queued user to create once the email is verified
  const [queuedCreateUser, setQueuedCreateUser] = useState<AuthorizedApiRequest<UserBase> | null>(
    null,
  );
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const {
    data: user,
    isSuccess,
    isError,
    error,
  } = useUser({ userId: userId ?? '', idToken: idToken ?? '' });
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();

  const createUserOnBackend = useCallback(
    (userData: AuthorizedApiRequest<UserBase>) => {
      createUserMutation.mutate(userData, {
        onSuccess: (data) => {
          setUserId(data.userId);
        },
        onError: (error) => {
          // Handle error, e.g., show a message to the user
        },
      });
    },
    [createUserMutation],
  );

  const createUser = useCallback(
    async (userBase: UserCreateProps) => {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        userBase.email,
        userBase.password,
      );
      const userCreateBase: UserBase = {
        ...userBase,
        firebaseId: credentials.user.uid,
      };
      const idToken = await credentials.user.getIdToken();
      if (credentials.user.emailVerified) {
        // TODO: Set up action code for verification and block
        // creation without destroying the creation process
        console.log('User email already verified, creating user on backend');
        // TODO: Actually get this to work esp on localhost...
        await sendEmailVerification(credentials.user, actionCodeSettings);
        setIsEmailVerificationPending(true);
        // setQueuedCreateUser({ ...userCreateBase, idToken });
        // return;
      }
      setIdToken(idToken);
      createUserOnBackend({ ...userCreateBase, idToken });
    },
    [createUserOnBackend],
  );
  const deleteUser = useCallback(() => {
    if (userId && idToken) {
      deleteUserMutation.mutate({ userId, idToken });
      return;
    }
    throw new Error('There is no logged in user to delete');
  }, [deleteUserMutation, idToken, userId]);

  // Handle user state changes
  const handleAuthStateChanged = useCallback(
    async (fbUser: FirebaseUser | null) => {
      console.log(`We have another change! ${JSON.stringify(fbUser)}`);
      if (fbUser) {
        setIdToken(await fbUser.getIdToken());
        setUserId(fbUser.uid);
      } else {
        setUserId(null);
        setIdToken(null);
        setIsAnonymous(true);
      }
      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  const isLoggedIn = useMemo(() => {
    console.log(`User logged in: ${user}, success=${isSuccess} error=${isError} errorMsg=${error}`);
    return !!user && !isError;
  }, [user, isSuccess, isError, error]);

  const logIn = useCallback(
    async (props: LogInProps) => {
      if (isLoggedIn) {
        console.error('Already logged in');
        return;
      }
      if (user) {
        throw new Error('User already logged in');
      }
      if (props && props.email.length > 0 && props.password.length > 0) {
        const credentials = await signInWithEmailAndPassword(auth, props.email, props.password);
        setUserId(credentials.user.uid);
        const idToken = await credentials.user.getIdToken(true);
        setIdToken(idToken);
        setIsAnonymous(false);
        console.log('User password logged in successfully');
      }
      if (!props) {
        const credentials = await signInAnonymously(auth);
        setUserId(credentials.user.uid);
        const idToken = await credentials.user.getIdToken();
        setIdToken(idToken);
        setIsAnonymous(true);
        console.log('User logged in anonymously');
      }
    },
    [isLoggedIn, user],
  );

  const logOut = useCallback(() => {
    setUserId(null);
    setIdToken(null);
    signOut(auth);
  }, []);

  const cancelCreateUser = useCallback(async () => {
    setQueuedCreateUser(null);
  }, []);

  const context = useMemo(
    () => ({
      user,
      idToken,
      isLoggedIn,
      logIn,
      logOut,
      createUser,
      cancelCreateUser,
      deleteUser,
      isAnonymous,
      isEmailVerificationPending,
    }),
    [
      user,
      idToken,
      isLoggedIn,
      logIn,
      logOut,
      createUser,
      cancelCreateUser,
      deleteUser,
      isAnonymous,
      isEmailVerificationPending,
    ],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return unsubscribe; // unsubscribe on unmount
  }, [handleAuthStateChanged]);

  if (initializing) return <></>;

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  return useContext(UserContext);
}
