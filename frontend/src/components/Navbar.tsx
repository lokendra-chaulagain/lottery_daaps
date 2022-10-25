import React from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppContext } from "../../context/context";

const Navbar = () => {
  //connect wallet
  const { connectWallet, address } = useAppContext();

  return (
    <>
      <nav className="navbar navbar-expand-lg custom_nav">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <GiHamburgerMenu className="custom_hamburger" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand">My Logo</a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href={"/"}>
                  <a className="nav-link active" aria-current="page">
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"/history"}>
                  <a className="nav-link">History</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href={"/transactions"}>
                  <a className="nav-link">Transactions</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href={"/logout"}>
                  <a className="nav-link">Logout</a>
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {address ? (
                <button className="btn navbar_button rounded-1" type="submit">
                  {address}
                </button>
              ) : (
                <button onClick={connectWallet} className="btn navbar_button rounded-1" type="submit">
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
