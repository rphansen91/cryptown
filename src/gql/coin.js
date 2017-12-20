import gql from 'graphql-tag'
import { graphql } from 'react-apollo';

const coinQuery = gql`
query Coin($id: String!) {
  coin(id: $id) {
    id
    name
    symbol
    price_usd
    price_btc
    percent_change_24h
  }
}
`

export default graphql(coinQuery, {
  options: ({ id }) => ({ variables: { id } })
})
