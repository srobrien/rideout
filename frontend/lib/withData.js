import { ApolloLink, Observable, split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import withApollo from 'next-with-apollo';
import { withClientState } from 'apollo-link-state';
import { wss, endpoint } from '../config';

function createClient({ headers }) {
  const cache = new InMemoryCache();

  const request = async operation => {
    operation.setContext({
      http: {
        includeExtensions: true,
        includeQuery: false,
      },
      fetchOptions: {
        credentials: 'include',
      },
      headers,
    });
  };

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

  const httpLink = new BatchHttpLink({
    uri: endpoint,
    headers: {
      'Access-Control-Allow-Origin':
        'https://rideout-app-backend.herokuapp.com/',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
    fetchOptions: {
      mode: 'no-cors',
    },
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: wss,
        options: {
          reconnect: true,
        },
      })
    : () => {
        console.log('SSR');
      };

  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return (
        kind === 'OperationDefinition' &&
        operation === 'subscription' &&
        process.browser
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.error({ graphQLErrors });
        }
        if (networkError) {
          console.error({ networkError });
        }
      }),
      requestLink,

      withClientState({
        defaults: {
          isConnected: true,
        },
        resolvers: {
          Mutation: {
            updateNetworkStatus: (_, { isConnected }, { cache }) => {
              cache.writeData({ data: { isConnected } });
              return null;
            },
          },
        },
        cache,
      }),

      createPersistedQueryLink().concat(terminatingLink),
    ]),
    cache,
  });
}

export default withApollo(createClient);
