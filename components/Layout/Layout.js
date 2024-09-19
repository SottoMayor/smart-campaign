import React, { Fragment } from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';

const Layout = ({ children }) => {
  return (
    <Container>
        <Header/>
            {children}
        <footer>FOOTER!!!!</footer>
    </Container>
  )
}

export default Layout