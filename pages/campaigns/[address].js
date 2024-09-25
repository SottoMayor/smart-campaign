import React from 'react';
import Layout from '../../components/Layout/Layout';
import campaignInstance from '../../ethereum/campaign';


const CampaignDetails = () => {
  return (
    <Layout>
      <div>CampaignDetails</div>
    </Layout>
  )
}

CampaignDetails.getInitialProps = async (props) => {
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