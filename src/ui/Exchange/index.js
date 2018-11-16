import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { setProfile } from '../../store/reducers/profile';
import { FormGroup } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import ProgressButton from 'react-progress-button';
import storage from '../../utility/storage';
import gql from 'graphql-tag';
import './style.css';

const exchangeQuery = gql`
query Exchange($name: String!, $apikey: String!, $apisecret: String!) {
  exchange(name: $name) {
    name
    balance(apikey: $apikey, apisecret: $apisecret) {
      Currency
      Balance
    }
  }
}
`

class Exchange extends Component {
  constructor (props) {
    console.log(props)
    super(props)
    this.state = {
      button: '',
      apikey: props.apikey || '',
      apisecret: props.apisecret || ''
    }
  }

  handleChange (key, ev) {
    this.setState({ [key]: ev.target.value })
  }

  handleSubmit () {
    const { name, setExchange } = this.props
    const { apikey, apisecret } = this.state

    return this.props.client.query({
      query: exchangeQuery,
      variables: { name, apikey, apisecret }
    })
    .then(() => setExchange({ apikey, apisecret }))
  }

  handleSuccess () {
    this.setState({ button: 'success' })
  }

  handleError (err) {
    console.log(err)
    this.setState({ button: 'error' })
  }

  render () {
    const { name, setExchange } = this.props
    const { apikey, apisecret, button } = this.state
    const id = name+"-exchange"

    return <div className="coin">
      <Typography type="subheading">{ name }</Typography>

      <FormGroup id={id} onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          id="apikey"
          placeholder="API Key"
          value={apikey}
          onChange={this.handleChange.bind(this, 'apikey')}
          margin="normal" />

        <TextField
          id="apisecret"
          placeholder="API Secret"
          value={apisecret}
          onChange={this.handleChange.bind(this, 'apisecret')}
          margin="normal" />

        <ProgressButton
          form={id}
          type="submit"
          state={button}
          onClick={this.handleSubmit.bind(this)}
          ><Typography type="subheading">Validate</Typography></ProgressButton>
      </FormGroup>
    </div>
  }
}


export default connect(
  ({ profile }, { name }) => profile[name.toLowerCase()],
  (dispatch, { name }) => ({
    setExchange: (ex) => {
      storage('profile').get()
      .then(profile => {
        profile[name.toLowerCase()] = ex
        return profile
      })
      .then(storage('profile').save)
      .then(profile => dispatch(setProfile(profile)))
    }
  })
)(withApollo(Exchange))
