/** The unique identifier for a valid user session. */
export type IdToken = {
  /** The user JWT token itself. */
  idToken: string;
};

/** The required properties for a log in request. */
export type LogInProps = {
  /** The user's email address. */
  email: string;
  /** The user's password. */
  password: string;
};

// TODO: Have this auth token validated on the server side
// TODO: Update tanstack queries to accept the token where needed
/** The required properties for an authorized API request. */
export type AuthorizedApiRequest<T> = IdToken & T;
