import React from 'react'
import Layout from '../../../../components/Layout/Layout'
import Link from 'next/link'
import {  Button } from 'semantic-ui-react';

const requests = (props) => {
  return (
    <Layout>
      <h3>requests</h3>

      <Link href={`campaigns/${props.address}/new`}>
        <a>
          <Button primary>
            Add Request!
          </Button> 
        </a>
      </Link>
    </Layout>
  )
}

requests.getInitialProps = (props) => {
  const { address } = props.query;

  return { address }
}

export default requests