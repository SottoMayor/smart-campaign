import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/Layout/Layout';
import Link from 'next/link';

export default class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

      console.log(campaigns)

      return { campaigns }
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => (
      {
        header: address,
        description: (<Link href={`/campaigns/${address}`}><a>View campaign!</a></Link>),
        fluid: true
      }
    ))

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link href="/campaigns/new">
            <a>
              <Button
                content="Create Campaign" floated='right' icon="add circle" primary
              /> 
            </a>
          </Link>
          
          {this.renderCampaigns()}
        </div>
      </Layout>
    )
  }
}
