import CampaignFactory from './build/CampaignFactory.json';
import web3 from './web3';
require('dotenv').config({path: '../.env'})

const instance = new web3
.eth
.Contract(
    JSON.parse(CampaignFactory.interface), 
    process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS 
)

export default instance