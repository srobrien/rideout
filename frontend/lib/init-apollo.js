import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { endpoint } from '../config';

let apolloClient = null;

function create(initialState, headers) {
  const isBrowser = typeof window !== 'undefined';

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: endpoint, // Server URL (must be absolute)
      credentials: 'include', // Additional fetch() options like `credentials` or `headers`
      headers: {
        ...headers,
      },
      // Use fetch() polyfill on the server
      fetch: !isBrowser && fetch,
    }),

    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
