import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default fetch => new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL, fetch }),
  cache: new InMemoryCache(),
  ssrMode: true
});
