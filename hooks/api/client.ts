import { getAuth, getIdToken } from 'firebase/auth';
import createFetchClient, { type Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from '@/generated/api';

const fetchClient = createFetchClient<paths>({
  baseUrl: 'http://localhost:8088/',
});

const auth = getAuth();

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const user = auth.currentUser;

    if (user) {
      try {
        const accessToken = await getIdToken(user);
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      } catch {
        console.error('Failed to obtain auth token for user.');
      }
    }
    return request;
  },
};

fetchClient.use(authMiddleware);

export const apiClient = createClient(fetchClient);
