import Constants from 'expo-constants';
import { ARRAY_SEPARATOR } from '@/constants/QueryParams';
import { IdToken } from '@/shapes';

const { expoConfig } = Constants;

export const localhost = expoConfig?.hostUri?.split(':').shift();
const localDevApi = localhost?.concat(':8088');
const endpoint = localDevApi ? `http://${localDevApi}` : 'https://yourapi.com';

/** The http methods allowed by the app. */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/** The generic properties that are used to hit an API. */
export interface HitApiProps<I> extends IdToken {
  /**
   * The http method to use to hit the API.
   *
   * @default 'GET'
   */
  method?: HttpMethod;
  /**
   * The path on the API to hit.
   */
  path: string;
  /**
   * The body to send with the request (if there is one).
   *
   * @default undefined
   */
  body?: I;
  /**
   * The query parameters to send with the request in the URL.
   *
   * @default undefined
   */
  params?: URLSearchParams;
}

/**
 * Hits the API and handles
 * @param props The required properties to hit.
 * @returns A promise containing the returned type.
 */
export async function hitApi<T, I>(props: HitApiProps<I>): Promise<T> {
  const { method = 'GET', path, body, idToken, params } = props;
  if (!idToken || idToken === '') throw new Error('No idToken provided');
  const uri = `${endpoint}/${path}` + (params ? `?${params.toString()}` : '');
  const response = await fetch(uri, {
    method,
    body: JSON.stringify(body),
    // TODO get the auth header to attach!
    headers: new Headers({
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    }),
    redirect: 'manual',
  });
  if (!response.ok) {
    try {
      const errorResponse = await response.json();
      console.error(`Error response from API: ${JSON.stringify(errorResponse)}`);
    } catch (error) {
      const responseText = await response.text();
      console.error(`Error parsing error response: ${error}, response: ${responseText}`);
    }
    console.error(`API call failed with status: ${response.status} - ${response.statusText}`);
    throw new Error(`Cannot call ${method} on ${uri}; err: ${response.statusText}`);
  }
  if (response.redirected) {
    const redirectedUri = new URL(response.url);
    console.warn(`Request was redirected to ${redirectedUri.pathname}`);
    return hitApi({
      ...props,
      path: redirectedUri.pathname,
    });
  }
  return (await response.json()) as T;
}

/** An object that can be converted easily to URL params. */
type QueryParamObject = { [key: string]: any };

/**
 * Convenience function for converting a series of properties into url
 * query parameters.
 * @param props Any input properties.
 * @returns The inputs converted to url query params.
 */
export function convertPropsToQueryParams(props: QueryParamObject): URLSearchParams {
  const params = new URLSearchParams();
  Object.entries(props).forEach((entry) => {
    const [paramName, value] = entry;
    if (value) {
      if (value instanceof Array && value.length) {
        params.set(paramName, value.join(ARRAY_SEPARATOR));
      } else if (value instanceof Object) {
        params.set(paramName, btoa(JSON.stringify(value)));
      } else {
        params.set(paramName, value.toString());
      }
    }
  });
  return params;
}

/**
 * Replaces the default path.join function which does not ship with react native.
 * @param values the list of values to join as paths
 * @return the values joined as paths with one `/` between each element
 */
export function join(...values: string[]): string {
  return values
    .map((value, index) => {
      if (value.startsWith('/') && index > 0) {
        value = value.slice(1);
      }
      if (value.endsWith('/')) {
        value = value.slice(0, -1);
      }
      return value;
    })
    .join('/');
}
