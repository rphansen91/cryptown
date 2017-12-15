import React from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { uri } from '../gql/connection';

function graphQLFetcher(graphQLParams) {
  return fetch(uri, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json())
}

export default (props) =>
  <div {...props}>
    <GraphiQL fetcher={graphQLFetcher} />
  </div>
