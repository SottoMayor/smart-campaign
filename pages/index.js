import React, { Component } from 'react'
import factory from '../ethereum/factory';

export default class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaings = await factory.methods.getDeployedCampaigns().call();

      console.log(campaings)

      return { campaings }
  }

  render() {
    return (
      <div>{this.props.campaings[0]}</div>
    )
  }
}
