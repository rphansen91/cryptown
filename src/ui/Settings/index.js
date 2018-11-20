import React from 'react';
import Typography from 'material-ui/Typography';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setProfile } from '../../store/reducers/profile';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import List, { ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import Switch from 'material-ui/Switch';
import { withTheme } from 'material-ui/styles';
import storage from '../../utility/storage';
import Exchange from '../Exchange';
import SEO from '../SEO';

const withProfile = connect(
  ({ profile }) => ({ profile }),
  dispatch => ({
    setProfile: (p) => {
      storage('profile').save(p)
      .then(() => dispatch(setProfile(p)))
    }
  })
)

export default compose(withTheme(), withProfile)(({ theme, profile, setProfile }) =>
  <div>
    <SEO title='Settings | Hodl Stream' path='/settings' />
    <section>

      <section />

      <Typography type="title">Settings</Typography>

      <section />

      <section>
        <Typography type="subheading">Exchanges</Typography>
        <div className="icons">
          <Exchange name={"Bittrex"} />
          <Exchange name={"Binance"} />
          <Exchange name={"HitBTC"} />
        </div>
      </section>

      <div className="contained">
        <section>
          <Typography type="subheading">Theme</Typography>
          <FormGroup>
            <FormControlLabel
              label={profile.theme !== 'light' ? 'Dark' : 'Light'}
              control={
                <Switch
                  checked={profile.theme !== 'light'}
                  onChange={(event, checked) => {
                    const p = Object.assign({}, p, {
                      theme: checked ? 'dark' : 'light'
                    })
                    setProfile(p)
                  }}
                />} />
          </FormGroup>
        </section>

        <section>
          <List>
            <ListItem><Link to="/terms" style={{
              color: theme.palette.text.secondary
            }}>Terms and Conditions</Link></ListItem>
          </List>
        </section>

      </div>
    </section>
  </div>)
