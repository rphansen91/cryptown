import gql from 'graphql-tag'

export const exchangeQuery = gql`
query Exchange($name: String!, $apikey: String!, $apisecret: String!) {
  exchange(name: $name) {
    name
    balance(apikey: $apikey, apisecret: $apisecret) {
      Currency
      Balance
    }
    txs(apikey: $apikey, apisecret: $apisecret) {
      coin
      symbol
      value
      createdAt
    }
  }
}
`

export const queryExchange = function ({ name, apikey, apisecret }) {
  return this.props.client.query({
    query: exchangeQuery,
    variables: { name, apikey, apisecret }
  })
  .then(({ data: { exchange } }) => exchange)
}

export const queryExchangeTxs = function (opts) {
  return queryExchange.call(this, opts)
  .then(({ txs }) => txs)
}

export const queryExchangeBalance = function (opts) {
  return queryExchange.call(this, opts)
  .then(({ balance }) => balance)
}
