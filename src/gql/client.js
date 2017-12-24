import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { uri } from './connection';

export default fetch => new ApolloClient({
  link: new HttpLink({ uri, fetch }),
  cache: new InMemoryCache(),
  shouldBatch: true
});
