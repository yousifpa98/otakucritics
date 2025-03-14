import React from "react";
import { Link } from "react-router";

const MobileNav = () => {
  const navItems = [
    { id: "23t09i", name: "Home", to: "/" },
    { id: "98f4k2", name: "TopLists", to: "/toplists" },
  ];

  return (
    <nav>
      <ul className="nav-list">
        {navItems.map((nI) => {
          return (
            <li className="nav-item">
              <Link to={nI.to}>{nI.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileNav;
