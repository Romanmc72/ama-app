import { Href } from 'expo-router';
/**
 * The available routes to navigate to different pages. Not the same as
 * the API route structure, this is only for the app.
 */

/** A route within the app and its associated metadata. */
export type AppRoute = {
  /**
   * The file-based router path minus (group) identifiers to the app's tsx
   * file. This is to be used for the navigation scheme
   * (Drawer/Tab/Stack/Slot) name prop.
   */
  path: string;
  /** The path (includes group modifiers) for router navigation. */
  routerPath: Href;
  /** The title of the app route. */
  title: string;
};

/** A flattened route layout structure with no nested routes. */
type FlatLayout = {
  /** The route name and its route details. */
  [routeName: string]: AppRoute;
};

/** The route layout structure of this app. */
type RouteTree = {
  /**
   * The root layout items for routes and files located at the root folder.
   * This will contain the splash page and the pages used for logging into the app.
   */
  ROOT: FlatLayout;
  /** The nested layout for managing user lists. */
  LIST: FlatLayout;
  /** The main screens of the app itself. */
  SCREENS: FlatLayout;
  /** The nested layout for user specific settings. */
  USER: FlatLayout;
};

/** All of the organized metadata about the routes within the application. */
export const routeTree: RouteTree = {
  ROOT: {
    index: {
      path: '/',
      routerPath: '/',
      title: 'Get Started',
    },
    passwordLogin: {
      path: 'passwordLogin',
      routerPath: '/passwordLogin',
      title: 'Email Log In',
    },
    selectAuthProvider: {
      path: 'selectAuthProvider',
      routerPath: '/selectAuthProvider',
      title: 'Log In',
    },
    signUp: {
      path: 'signUp',
      routerPath: '/signUp',
      title: 'Sign Up',
    },
  },
  LIST: {
    index: {
      path: 'index',
      routerPath: '/(list)/index',
      title: '',
    },
    createList: {
      path: 'createList',
      routerPath: '/(list)/createList',
      title: 'Create Question List',
    },
    list: {
      path: 'list',
      routerPath: '/(list)',
      title: 'Create Question List',
    },
  },
  USER: {
    settings: {
      path: 'index',
      routerPath: '/(user)/index',
      title: '',
    },
    appearanceSettings: {
      path: 'appearanceSettings',
      routerPath: '/(user)/appearanceSettings',
      title: 'Appearance',
    },
    editAccount: {
      path: 'editAccount',
      routerPath: '/(user)/editAccount',
      title: 'Manage Account',
    },
    languageSettings: {
      path: 'languageSettings',
      routerPath: '/(user)/languageSettings',
      title: 'Language',
    },
    manageSubscription: {
      path: 'manageSubscription',
      routerPath: '/(user)/manageSubscription',
      title: 'Manage Subscription',
    },
  },
  SCREENS: {
    ask: {
      path: 'ask',
      routerPath: '/ask',
      title: 'Ask Me Anything',
    },
    find: {
      path: 'find',
      routerPath: '/find',
      title: 'Find A Question',
    },
  },
};
