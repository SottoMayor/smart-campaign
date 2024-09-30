import React from 'react';
import Layout from '../../../components/Layout/Layout';
import campaignInstance from '../../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react'
import web3 from '../../../ethereum/web3';
import Contribute from '../../../components/Contribute';
import Link from 'next/link';

const CampaignDetails = (props) => {

  const renderCards = () => {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
     } = props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The author of this campaign and can create requests to withdraw money.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (Wei)',
        description: 'You must contribute at least this much wei to became an approver.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'A request tries to withdraw a money from the contract. Requests must be approved by approvers.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description: 'Number of people who have already donated to campaign.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign balance (ether)',
        description: 'How much money this campaign has left to spend.',
        style: { overflowWrap: 'break-word' }
      }
    ]

    return <Card.Group items={items}/>
  }

  return (
    <Layout>
      <div>CampaignDetails</div>
      <Grid>

        <Grid.Column width={10}>
          {renderCards()}
          <br/>
          <Link href={`/campaigns/${props.address}/requests`}>
            <a>
              <Button primary>
                View Requests
              </Button>
            </a>
          </Link>
        </Grid.Column>

        <Grid.Column width={6}>
          <Contribute address={props.address}/>
        </Grid.Column>

      </Grid>
      
    </Layout>
  )
}

CampaignDetails.getInitialProps = async (props) => {

 const campaign = campaignInstance(props.query.address);

 // Returns an object, your keys are non-negative intergers
 const summary = await campaign.methods.getSummary().call();

 return {
  address: props.query.address,
  minimumContribution: summary[0].toString(),
  balance: summary[1].toString(),
  requestsCount: summary[2].toString(),
  approversCount: summary[3].toString(),
  manager: summary[4],
 }
}

export default CampaignDetails;