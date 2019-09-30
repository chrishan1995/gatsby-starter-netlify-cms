import React from 'react'

const Footer = ({ isHomePage }) => (
  <footer className={`container mopio-footer ${isHomePage ? 'transparent' : ''}`}>
    <div>© 2019 Mopio. All rights reserved.</div>
  </footer>
)

export default Footer
