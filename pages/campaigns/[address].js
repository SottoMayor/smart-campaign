import React from 'react';
import Layout from '../../components/Layout/Layout';


const CampaignDetails = () => {
  return (
    <Layout>
      <div>CampaignDetails</div>
    </Layout>
  )
}

CampaignDetails.getInitialProps = async (props) => {
 console.log(props.query.address)

 return {}
}

export default CampaignDetails;