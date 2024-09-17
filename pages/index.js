import React, { useEffect } from 'react';
import factory from '../ethereum/factory';


const index = () => {
  useEffect(() => {
    const loadContract = async () => {
      const campaings = await factory.methods.getDeployedCampaigns().call();

      console.log(campaings)
    }

    loadContract()
    
}, [])

  return (
    <div>index</div>
  )
}

export default index