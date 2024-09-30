import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

const Contribute = (props) => {
    const [value, setValue] = useState(0);

    const submitHandler = async (event) => {
        event.preventDefault();

        const campaign = Campaign(props.address)

        try{
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
        }catch(error){

        }
    }

  return (
    <Form onSubmit={submitHandler}>
        <Form.Field>
            <label>Amount to Contribute</label>
            <Input 
            value={value}
            onChange={event => setValue(event.target.value)}
            label="Ether" labelPosition='right'/>
        </Form.Field>
        <Button primary>Contribute</Button>
    </Form>
  )
}

export default Contribute