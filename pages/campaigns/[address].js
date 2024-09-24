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

 const summary = await campaign.methods.getSummary().call();

 console.log(summary)
 return {}
}

export default CampaignDetails;