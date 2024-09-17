import React from 'react';import classes from './Header.module.css';
const Header = () => { return ( <header className={classes.header} >
   <nav>
     <h1><span>E</span>nsar</h1>
      <h2>commerce</h2>
      <ul>
         <li><a href="#home">Home</a></li>
          <li><a href="#buy">Buy</a></li>
           <li><a href="#mac">Mac</a></li> <li><a href="#phone">Phone</a></li>
            <li><a href="#pad">Pad</a></li>
            <li><a href="#watch">Watch</a></li>
             <li><a href="#contact">Contact</a></li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>account</title>
                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>cart</title>
                  <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" /></svg>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>heart</title>
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                    </svg>
                    </ul>
                    </nav>
                    </header>
                    );
                  };
export default Header;