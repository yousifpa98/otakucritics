import React from 'react'
import "./Header.css"
import ProfileMenu from '../Components/ProfileMenu'
import MobileNav from '../Components/MobileNav'

const Header = () => {
  return (
    <header>
        <div className="header-logo">
            <h3>OtakuCritics</h3>
        </div>
        <MobileNav />
        <ProfileMenu />
    </header>
  )
}

export default Header