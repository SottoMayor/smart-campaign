import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Form, Button, Input } from 'semantic-ui-react'

const CampaingNew = () => {
    const [amount, setAmount] = useState(0);

    const amountHandler = (event) => setAmount(event.target.value)

  return (
    <Layout>
        <h3>New Campaing!</h3>

        <Form>
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