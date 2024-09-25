import React from 'react';
import Layout from '../../components/Layout/Layout';
import campaignInstance from '../../ethereum/campaign';
import { Card } from 'semantic-ui-react'

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
        description: 'The author of this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      }
    ]

    return <Card.Group items={items}/>
  }

  return (
    <Layout>
      <div>CampaignDetails</div>
      {renderCards()}
    </Layout>
  )
}

CampaignDetails.getInitialProps = async (props) => {

  // Fixing the " TypeError: Do not know how to serialize a BigInt" issue.
  BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
  };

 const campaign = campaignInstance(props.query.address);

 // Returns an object, your keys are non-negative intergers
 const summary = await campaign.methods.getSummary().call();

 return {
  minimumContribution: summary[0],
  balance: summary[1],
  requestsCount: summary[2],
  approversCount: summary[3],
  manager: summary[4],
 }
}

export default CampaignDetails;