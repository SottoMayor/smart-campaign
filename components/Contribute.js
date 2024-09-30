import React from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

const Contribute = () => {
  return (
    <Form>
        <Form.Field>
            <label>Amount to Contribute</label>
            <Input label="Ether" labelPosition='right'/>
        </Form.Field>
        <Button primary>Contribute</Button>
    </Form>
  )
}

export default Contribute