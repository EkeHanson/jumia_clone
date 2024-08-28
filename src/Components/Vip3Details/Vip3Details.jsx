// // import React from 'react'
// import "./Vip3Details.css";

// const Vip3Details = () => {
//   return (
//     <div className="container-fluid">
//       <div className="container bg-light rounded">
//         <h2></h2>
//         <div className="row">
//             <div className="table-responsive">
//               <table className="table caption-top text-center">
//                 <caption className="text-center fs-2 fw-bold text-dark py-3">VIP 2</caption>
//                 <thead>
//                   <tr>
//                     <th scope="col">#No.</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">ID Number</th>
//                     <th scope="col">Balance</th>
//                     <th scope="col">Number Of Grabs</th>
//                     <th scope="col">Control Panel</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">1</th>
//                     <td>Mark</td>
//                     <td>23311</td>
//                     <td>$0</td>
//                     <td>(0)</td>
//                     <td className="d-flex">
//                     <button className="btn-success btn text-light px-2 py-1 rounded mx-1">
//                        Promote
//                       </button>
//                       <button className="btn btn-warning border-0 text-light px-2 py-1 rounded">
//                        Demote
//                       </button>
//                       <button className="btn btn-danger border-0 text-light px-2 mx-1 py-1 rounded">
//                       <i className="bi bi-trash3"></i>
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">2</th>
//                     <td>Jacob</td>
//                     <td>12745622</td>
//                     <td>$0</td>
//                     <td>(0)</td>
//                     <td className="d-flex">
//                     <button className="btn-success btn text-light px-2 py-1 rounded mx-1">
//                        Promote
//                       </button>
//                       <button className="btn btn-warning border-0 text-light px-2 py-1 rounded">
//                        Demote
//                       </button>
//                       <button className="btn btn-danger border-0 text-light px-2 mx-1 py-1 rounded">
//                       <i className="bi bi-trash3"></i>
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">3</th>
//                     <td>Larry</td>
//                     <td>43226</td>
//                     <td>$0</td>
//                     <td>(0)</td>
//                     <td className="d-flex">
//                     <button className="btn-success btn text-light px-2 py-1 rounded mx-1">
//                        Promote
//                       </button>
//                       <button className="btn btn-warning border-0 text-light px-2 py-1 rounded">
//                        Demote
//                       </button>
//                       <button className="btn btn-danger border-0 text-light px-2 mx-1 py-1 rounded">
//                       <i className="bi bi-trash3"></i>
//                       </button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default Vip3Details;

import { useState, useEffect } from "react";
import "./Vip3Details.css";
import { Link } from "react-router-dom";

const Vip3Details = () => {
  const [vip2Users, setVip2Users] = useState([]);
  const [loading, setLoading] = useState(true);

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [promoting, setPromoting] = useState(null);
  const [demoting, setDemoting] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    // Fetch VIP 2 data from the backend
    const fetchVip2Users = async () => {
      try {
        const response = await fetch(
          `${djangoHostname}/api/accounts/users/by-level/VIP3/`
        );
        const data = await response.json();
        setVip2Users(data);
      } catch (error) {
        console.error("Error fetching VIP 2 users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVip2Users();
  }, []);

  const promoteToVip3 = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to promote this user to VIP3 ?"
    );
    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }
    setPromoting(userId); // Set loading state to the user ID
    try {
      const response = await fetch(
        `${djangoHostname}/api/accounts/users/${userId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // balance: "0.0",
            // unsettle: "0.0",
            commission1: "0.0",
            commission2: "0.0",
            grabbed_orders_count: 0,
            level: "VIP3",
          }),
        }
      );

      if (response.ok) {
        setVip2Users(vip2Users.filter((user) => user.id !== userId)); // Update the state to remove the deleted user
        // alert("User promoted successfully!");
        // Optionally, update the UI to reflect the changes
      } else {
        alert("Failed to promote user.");
      }
    } catch (error) {
      console.error("Error promoting user:", error);
    } finally {
      setPromoting(null); // Reset loading state
    }
  };

  const demoteToVip2 = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to demote this user to VIP2?"
    );
    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }

    setDemoting(userId); // Set loading state only after confirmation

    try {
      const response = await fetch(
        `${djangoHostname}/api/accounts/users/${userId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            balance: "0.0",
            unsettle: "0.0",
            commission1: "0.0",
            commission2: "0.0",
            grabbed_orders_count: 0,
            level: "VIP2",
          }),
        }
      );

      if (response.ok) {
        setVip2Users(vip2Users.filter((user) => user.id !== userId)); // Update the state to remove the demoted user
      } else {
        alert("Failed to demote user.");
      }
    } catch (error) {
      console.error("Error demoting user:", error);
    } finally {
      setDemoting(null); // Reset loading state
    }
  };
  // Handle Deletion
  const deleteUser = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }

    setDeleting(userId); // Set loading state to the user ID

    try {
      const response = await fetch(
        `${djangoHostname}/api/accounts/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setVip2Users(vip2Users.filter((user) => user.id !== userId)); // Update the state to remove the deleted user
        // alert("User deleted successfully!");
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleting(null); // Reset loading state
    }
  };

  return (
    <div className="container-fluid">
      <div className="my-3">
        <h3 className="text-light">
          <Link to={"/admin-dashboard"} className="text-light">
            <i className="bi bi-chevron-left me-4"></i>
          </Link>
          ADMIN DASHBOARD
        </h3>
      </div>
      <div className="container bg-light rounded">
        <div className="row">
          <div className="table-responsive">
            <table className="table caption-top text-center">
              <caption className="text-center fs-2 fw-bold text-dark py-3">
                VIP 3 Users
              </caption>
              <thead>
                <tr>
                  <th scope="col">#No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">ID Number</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Number Of Grabs</th>
                  <th scope="col">Control Panel</th>
                </tr>
              </thead>
              <tbody>
                {vip2Users.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.invitationCode_display.code}</td>
                    <td>${user.balance}</td>
                    <td>({user.grabbed_orders_count})</td>
                    <td className="d-flex justify-content-center">
                      <button
                        className="btn btn-warning text-light text-center w-100 px-2 py-1 rounded mx-1"
                        onClick={() => demoteToVip2(user.id)}
                        disabled={demoting === user.id} // Disable button during loading
                      >
                        {demoting === user.id ? (
                          <span
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          "Demote"
                        )}
                      </button>

                      <button
                        className="btn btn-danger text-light px-2 py-1 rounded mx-1"
                        onClick={() => deleteUser(user.id)}
                        disabled={deleting === user.id} // Disable button during loading
                      >
                        {deleting === user.id ? (
                          <span
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <i className="bi bi-trash3"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vip3Details;
