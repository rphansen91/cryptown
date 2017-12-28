import React from 'react';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { setProfile } from '../../store/reducers/profile';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import storage from '../../utility/storage';
import SEO from '../SEO';

export default connect(
  ({ profile }) => ({ profile }),
  dispatch => ({
    setProfile: (p) => {
      storage('profile').save(p)
      .then(() => dispatch(setProfile(p)))
    }
  })
)(({ profile, setProfile }) =>
  <div>
    <SEO title='Settings | Hodl Stream' path='/settings' />
    <section />
    <section>
      <div className="contained">
        <Typography type="title">Settings</Typography>
        <FormGroup>
          <FormControlLabel
            label={profile.theme === 'dark' ? 'Dark' : 'Light'}
            control={
              <Switch
                checked={profile.theme === 'dark'}
                onChange={(event, checked) => {
                  const p = Object.assign({}, p, {
                    theme: checked ? 'dark' : 'light'
                  })
                  setProfile(p)
                }}
              />} />
      </FormGroup>
      </div>
    </section>
  </div>)
