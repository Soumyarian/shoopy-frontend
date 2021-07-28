import React from 'react'
import Footer from '../Footer'
import Header from '../Header/'

const Layout = (props) => {
    return (
        <>
            <Header></Header>
            {props.children}
            <Footer />
        </>
    )
}

export default Layout
