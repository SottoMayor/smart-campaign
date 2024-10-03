import React from 'react';
import RequestRow from './RequestRow';
import { Table } from 'semantic-ui-react';

const RequestTable = (props) => {

    const { Header, Row, HeaderCell, Body } = Table

    const renderRows = () => {
      return props.reqs.map((req, index) => (
        <RequestRow
        request={req}
        id={index}
        key={index}
        address={props.address}
        approversCount={props.approversCount}
        />
      ))
    }

  return (
    <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {renderRows()}
        </Body>
    </Table>
  )
}

export default RequestTable