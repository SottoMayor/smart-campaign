import React, { useState } from 'react'
import { Form, Button, Input } from 'semantic-ui-react';
import Layout from '../../../../components/Layout/Layout';

const newRequest = () => {

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  
  return (
    <Layout>
      <h3>Create a Request</h3>

      <Form>
        <Form.Field>
          <label>Description</label>
          <Input 
          value={value}
          onChange={event => setValue(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input
          value={description}
          onChange={event => setDescription(event.target.value)}
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