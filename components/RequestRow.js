import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

const RequestRow = (props) => {

    const { Row, Cell } = Table
    const { id, approversCount, address, request: { description, value, recipient, complete, approvalCount } } = props

    const readyToFinalize = approvalCount > approversCount / 2;

    const approveHandler = async () => {
      const campaign = Campaign(address)

      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({ from: accounts[0] })
    }

    const finalizeHandler = async () => {
      const campaign = Campaign(address)

      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id).send({ from: accounts[0] })
    }

  return (
    <Row disabled={complete} positive={readyToFinalize && !complete}>
        <Cell>{id + 1}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>{approvalCount}/{approversCount}</Cell>
        <Cell>
          {
          complete &&
          <Button color='green' basic onClick={approveHandler}>
            Approve!
          </Button>
          }
        </Cell>
        <Cell>
          {
            complete &&
            <Button negative basic onClick={finalizeHandler}>
            Finalize
          </Button>
          }
        </Cell>
    </Row>
  )
}

export default RequestRow