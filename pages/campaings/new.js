import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Form, Button, Input } from 'semantic-ui-react'
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

const CampaingNew = () => {
    const [amount, setAmount] = useState(0);

    const amountHandler = (event) => setAmount(event.target.value)

    const onSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        await factory
        .methods
        .createCampaign(amount)
        .send({
            from: accounts[0],
            //gas: '' // Metamask handles it for us!
        })
    }

  return (
    <Layout>
        <h3>New Campaing!</h3>

        <Form onSubmit={onSubmit}>
            <Form.Field>
                <label>Minimum Ether Contribution</label>
                <Input value={amount} onChange={amountHandler} label="amount in WEI" labelPosition='right'/>
            </Form.Field>

            <Button primary>Create!</Button>
        </Form>
    </Layout>
  )
}

export default CampaingNew