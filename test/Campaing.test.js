const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');
const { describe, it } = require('mocha');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    // Get all test accounts
    accounts = await web3.eth.getAccounts();

    // Deployment of the Factory
    factory = await new web3
    .eth
    .Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000'})

    // Deployment of the Campaign through the Factory
    await factory
    .methods
    .createCampaign('100')
    .send({ from: accounts[0], gas: '1000000'});

    // Retrieving the Campaign address
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    // Retrieving the Campaign (Contract) of the blockchain
    campaign = await new web3
    .eth
    .Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
})

describe('Campaigns', () => {

    it('deploys the contracts', async () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    })

    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        
        assert.equal(accounts[0], manager);
    })

    it('allows people to contribute money and marks them as approvers', async () => {
        const contributor = accounts[1];
        await campaign.methods.contribute().send({value: '200', from: contributor});
        const isContributor = await campaign.methods.approvers(contributor).call(); // boolean

        assert(isContributor);
    })

    it('requires a minimum contribution', async () => {
        try{
            await campaign.methods.contribute().send({value: '5', from: accounts[1]});
            assert(false) // Forcing the failure if the line above doesn't break 
        }catch(err){
            assert(err) // actually, it expects to the error occurs!
        }
    })

    it('allows the manager to make a payment request', async () => {
        const description = 'Buy Batteries';
        const price = '100';
        const recipient = accounts[1];

        await campaign.methods.createRequest(description, price, recipient).send({ from: accounts[0], gas: '1000000'});

        const targetRequest = await campaign.methods.requests(0).call();

        assert.equal(targetRequest.description, description);
        assert.equal(targetRequest.value, price);
        assert.equal(targetRequest.recipient, recipient);
    })

    it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });

})