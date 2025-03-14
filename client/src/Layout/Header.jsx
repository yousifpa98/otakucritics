import React from 'react'
import "./Header.css"
import ProfileMenu from '../Components/ProfileMenu'

const Header = () => {
  return (
    <header>
        <div className="header-logo">
            <h3>OtakuCritics</h3>
        </div>
        <ProfileMenu />
    </header>
  )
}

export default Header