import React, { Fragment } from 'react'

const Layout = ({ children }) => {
  return (
    <Fragment>
        <header>HEADER!!!</header>
            {children}
        <footer>FOOTER!!!!</footer>
    </Fragment>
  )
}

export default Layout