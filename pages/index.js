import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/Layout/Layout';
import Link from 'next/link';

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
        description: (<Link href={`/campaings/${address}`}><a>View campaing!</a></Link>),
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
          <Link href="/campaings/new">
            <a>
              <Button
                content="Create Campaing" floated='right' icon="add circle" primary
              /> 
            </a>
          </Link>
          
          {this.renderCampaings()}
        </div>
      </Layout>
    )
  }
}
