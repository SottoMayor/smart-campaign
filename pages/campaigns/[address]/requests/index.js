import React from 'react'
import Layout from '../../../../components/Layout/Layout'
import Link from 'next/link'
import { Button } from 'semantic-ui-react';

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
    </Layout>
  )
}

requests.getInitialProps = async (props) => {
  const { address } = await props.query;

  console.log(address)

  return { address }
}

export default requests