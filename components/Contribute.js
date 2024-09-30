import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

const Contribute = () => {
    const [value, setValue] = useState(0);

    const submitHandler = event => {
        event.preventDefault();

        
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