import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { useRouter } from "next/router";

const Contribute = (props) => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const submitHandler = async (event) => {
        event.preventDefault();

        const campaign = Campaign(props.address)

        setLoading(true)
        setErrorMessage('')
        
        try{
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
            // Refreshing the page
            await router.replace(`/campaigns/${props.address}`);
        }catch(error){
            setErrorMessage(error.message)
        }
        setLoading(false)
        setValue('')
    }

  return (
    <Form onSubmit={submitHandler} error={!!errorMessage}>
        <Form.Field>
            <label>Amount to Contribute</label>
            <Input 
            value={value}
            onChange={event => setValue(event.target.value)}
            label="Ether" labelPosition='right'/>
        </Form.Field>
        <Message error header="Ooops!" content={errorMessage}/>
        <Button loading={loading} primary>Contribute</Button>
    </Form>
  )
}

export default Contribute