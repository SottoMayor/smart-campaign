import React, { useEffect } from 'react';
import factory from '../ethereum/factory';


const index = () => {
    useEffect(async () => {
        const campaings = await factory.methods.getDeployedCampaigns().call();

        console.log(campaings)
    }, [])

  return (
    <div>index</div>
  )
}

export default index