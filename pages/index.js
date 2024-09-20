import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/Layout/Layout';

export default class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaings = await factory.methods.getDeployedCampaigns().call();

      console.log(campaings)

      return { campaings }
  }

  renderCampaings() {
    const items = this.props.campaings.map(address => (
      {
        header: address,
        description: 'Link to go to the campaing!',
        fluid: true
      }
    ))

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaings</h3>
          <Button
            content="Create Campaing" floated='right' icon="add circle" primary
          /> 
          {this.renderCampaings()}
        </div>
      </Layout>
    )
  }
}
