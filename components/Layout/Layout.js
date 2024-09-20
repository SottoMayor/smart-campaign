import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';
import Footer from './Footer';
import 'semantic-ui-css/semantic.min.css'

const Layout = ({ children }) => {
  return (
    <Container>
        <Header/>
            {children}
        <Footer/>
    </Container>
  )
}

export default Layout