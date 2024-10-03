import React from 'react'
import Layout from '../../../../components/Layout/Layout'
import Link from 'next/link'
import { Button } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import RequestTable from '../../../../components/RequestTable';

const requests = (props) => {
 
  const { address } = props;

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

      <RequestTable reqs={props.reqs} address={props.address}/>
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