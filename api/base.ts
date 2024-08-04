import Constants from 'expo-constants';
import { ARRAY_SEPARATOR } from '@/constants/QueryParams';

const { expoConfig } = Constants;

const localDevApi = expoConfig?.hostUri?.split(':').shift()?.concat(':8088');
const endpoint = localDevApi ? `http://${localDevApi}` : 'https://yourapi.com';

/** The http methods allowed by the app. */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/** The generic properties that are used to hit an API. */
export interface HitApiProps<I> {
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
  const { method = 'GET', path, body, params } = props;
  const uri = `${endpoint}/${path}` + (params ? `?${params.toString()}` : '');
  const response = await fetch(uri, { method, body: JSON.stringify(body) });
  if (!response.ok) {
    throw new Error(`Cannot call ${method} on ${uri}; err: ${response.statusText}`);
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
