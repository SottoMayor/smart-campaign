import React from 'react'
import Layout from '../../components/Layout/Layout'
import { Form, Button } from 'semantic-ui-react'

const CampaingNew = () => {
  return (
    <Layout>
        <h3>New Campaing!</h3>

        <Form>
            <Form.Field>
                <label>Minimum Contribution</label>
                <input/>
            </Form.Field>

            <Button primary>Create!</Button>
        </Form>
    </Layout>
  )
}

export default CampaingNew