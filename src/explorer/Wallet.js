import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const walletQuery = gql`
query CurrentAddress($addr: String!) {
  address(addr: $addr) {
    balance
    txCount
    tx(limit: 10) {
    	txid
      blockhash
      confirmations
      valueOut
    }
  }
}
`

class Wallet extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { data } = this.props
    console.log(data)
    const { loading, error, address } = data
    if (loading) return <div>Loading...</div>
    if (error) return <div>{ error.message }</div>
    return <div>
      <p>{ address.balance }</p>
      <p>{ address.txCount }</p>
    </div>
  }
}

export default graphql(walletQuery, {
  options: ({ addr }) => ({ variables: { addr } })
})(Wallet)
