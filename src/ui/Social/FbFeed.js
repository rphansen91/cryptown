/* global FB */
import React from 'react';
import { LoadScript } from './loadScript'

export default ({ page, name, tabs='timeline' }) => (
  <LoadScript src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9" 
    onScriptLoaded={() => FB.XFBML.parse()}>
    <div className="fb-page" data-href={`https://www.facebook.com/${page}/`} data-tabs={tabs} data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
      <blockquote cite={`https://www.facebook.com/${page}/`} className="fb-xfbml-parse-ignore">
        <a href={`https://www.facebook.com/${page}/`}></a>
      </blockquote>
    </div>
  </LoadScript>
)