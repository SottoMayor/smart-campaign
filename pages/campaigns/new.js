import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { useRouter } from 'next/router';

const CampaignNew = () => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const amountHandler = (event) => setAmount(event.target.value)

    const onSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError('');

        try{
            const accounts = await web3.eth.getAccounts();

            await factory
            .methods
            .createCampaign(amount)
            .send({
                from: accounts[0],
                //gas: '' // Metamask handles it for us!
            })

            router.push('/');
        }catch(error){
            setError(error.message)
        }

        setLoading(false);
    }

  return (
    <Layout>
        <h3>New Campaign!</h3>

        <Form onSubmit={onSubmit} error={!!error}>
            <Form.Field>
                <label>Minimum Ether Contribution</label>
                <Input value={amount} onChange={amountHandler} label="amount in WEI" labelPosition='right'/>
            </Form.Field>

            <Button loading={loading} primary>Create!</Button>

            <Message error header="Ooops!" content={error}/>
        </Form>

    </Layout>
  )
}

export default CampaignNew