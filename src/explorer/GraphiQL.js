import React from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';

function graphQLFetcher(graphQLParams) {
  return fetch(process.env.REACT_APP_GRAPHQL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json())
}

export default (props) =>
  <div {...props}>
    <GraphiQL fetcher={graphQLFetcher} />
  </div>
