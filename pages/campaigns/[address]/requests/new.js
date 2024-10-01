import React, { useState } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import Link from 'next/link';
import Router from 'next/router';
import Layout from '../../../../components/Layout/Layout';

const newRequest = (props) => {

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  
  const submitHandler = async (event) => {
    event.preventDefault();

    const campaign = Campaign(props.address);

    console.log('ok')

    try{
      const accounts = await web3.eth.getAccounts();
      await campaign
      .methods
      .createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      )
      .send({ from: accounts[0] })

    }catch(err){
      console.log(err)
    }
  }

  return (
    <Layout>
      <h3>Create a Request</h3>

      <Form onSubmit={submitHandler}>
        <Form.Field>
          <label>Description</label>
          <Input 
          value={description}
          onChange={event => setDescription(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input
          value={value}
          onChange={event => setValue(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
          value={recipient}
          onChange={event => setRecipient(event.target.value)}
          />
        </Form.Field>

        <Button
        primary
        >Create!</Button>
      </Form>
    </Layout>
  )
}

newRequest.getInitialProps = async (props) => {
  const { address } = await props.query;

  console.log(address)

  return { address }
}

export default newRequest;