import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const productsQuery = gql`
  query Products {
    products {
      name
      amount
      description
      images
      currency
      session
    }
  }
`;

export default Cmp => props => (
  <Query query={productsQuery}>
    {result => <Cmp {...props} {...result} />}
  </Query>
);
