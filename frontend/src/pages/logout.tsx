import Link from "next/link";
import React from "react";

function Logout() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h100">
      <button type="button" disabled className="btn border-0 custom_button btn-lg rounded-0">
        You have been logged out successfully
      </button>

      <Link href={"/login"}>
        <a className="login_again mt-3">Login again ? </a>
      </Link>
    </div>
  );
}

export default Logout;
