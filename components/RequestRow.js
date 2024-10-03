import React from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

const RequestRow = (props) => {

    const { Row, Cell } = Table
    const { id, approversCount, request: { description, value, recipient, complete, approvalCount } } = props

  return (
    <Row>
        <Cell>{id + 1}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>{approvalCount}/{approversCount}</Cell>
        <Cell>{complete ? 'true' : 'false'}</Cell>
        <Cell>COMPLETE!!!</Cell>
    </Row>
  )
}

export default RequestRow