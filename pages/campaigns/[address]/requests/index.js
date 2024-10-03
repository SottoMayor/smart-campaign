import React from 'react'
import Layout from '../../../../components/Layout/Layout'
import Link from 'next/link'
import { Button, Table } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';

const requests = (props) => {
 
  const { address } = props;

  const { Header, Row, HeaderCell } = Table

  return (
    <Layout>
      <h3>requests</h3>

      <Link href={{
        pathname: '/campaigns/[address]/requests/new',
        query: { address: address },
      }}>
        <a>
          <Button primary>
            Add Request!
          </Button> 
        </a>
      </Link>
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
      </Table>
    </Layout>
  )
}

requests.getInitialProps = async (props) => {
  const { address } = await props.query;

  const campaign = Campaign(address)
  const requestCountBigInt = await campaign.methods.getRequestsAccount().call();
  const requestCount = parseInt(requestCountBigInt.toString())

  const rawRequests = await Promise.all(
    Array(requestCount).fill()
    .map((_, index) => campaign.methods.requests(index).call())
  )

  const reqs = rawRequests.map(element => ({
    description: element.description,
    value: element.value.toString(),
    recipient: element.recipient,
    complete: element.complete,
    approvalCount: element.approvalCount.toString()
  }));

  return { address, reqs, requestCount }
}

export default requests