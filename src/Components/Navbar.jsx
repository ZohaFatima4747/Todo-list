import React from 'react';
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="Flex">
      <div className='logo'>
        <span>iTask</span>
      </div>
      <ul className="flex">
        <li className='home'>Home</li>
        <li className='task'>Your Task</li>
      </ul>
    </nav>
  );
}

export default Navbar;
