import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const productsQuery = gql`
  query Products {
    checkout {
      products {
        name
        amount
        description
        images
        currency
      }
    }
  }
`;

export default Cmp => props => (
  <Query query={productsQuery}>
    {result => <Cmp {...props} {...result} />}
  </Query>
);
