import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const sidebarQuery = gql`
  query Sidebar($q: String!, $from: String) {
    news(q: $q, from: $from) {
      url
      title
      author
      source {
        name
      }
      publishedAt
      urlToImage
      content
      htmlContent
    }
  }
`;

export default Cmp => props => (
  <Query query={sidebarQuery} variables={{ q: "cryptocurrency" }}>
    {result => <Cmp {...props} {...result} />}
  </Query>
);
