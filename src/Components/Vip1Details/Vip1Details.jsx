// // import React from 'react'
// import "./Vip1Details.css";

// const Vip1Details = () => {
//   return (
//     <div className="container-fluid">
//       <div className="container bg-light rounded">
//         <h2></h2>
//         <div className="row">

//             <div className="table-responsive">
//               <table className="table caption-top text-center">
//                 <caption className="text-center fs-2 fw-bold text-dark py-3">Last Joined Users</caption>
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
//                     <td>
//                       <span className="timy text-light px-2 py-1 rounded">
//                        Promote
//                       </span>
//                       <span className="bg-danger text-light px-2 mx-1 py-1 rounded">
//                       <i className="bi bi-trash3"></i>
//                       </span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">2</th>
//                     <td>Jacob</td>
//                     <td>12745622</td>
//                     <td>$0</td>
//                     <td>(0)</td>
//                     <td>
//                     <span className="timy text-light px-2 py-1 rounded">
//                        Promote
//                       </span>
//                       <span className="bg-danger text-light px-2 mx-1 py-1 rounded">
//                       <i className="bi bi-trash3"></i>
//                       </span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">3</th>
//                     <td>Larry</td>
//                     <td>43226</td>
//                     <td>$0</td>
//                     <td>(0)</td>
//                     <td>
//                     <span className="timy text-light px-2 py-1 rounded">
//                        Promote
//                       </span>
//                       <span className="bg-danger text-light px-2 mx-1 py-1 rounded">
//                       <i className="bi bi-trash3"></i>
//                       </span>
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

// export default Vip1Details;

import { useEffect, useState } from "react";
import "./Vip1Details.css";
import { Link } from "react-router-dom";

const Vip1Details = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [vipUsers, setVipUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [deleting, setDeleting] = useState(null); // State to track loading status
  const [promoting, setPromoting] = useState(null); // State to track loading status

  // Fetch VIP 1 users from the backend
  useEffect(() => {
    const fetchVipUsers = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/accounts/users/by-level/VIP1/`); // Replace with your API endpoint
        const data = await response.json();
        setVipUsers(data); // Assuming the API returns an object with a 'users' key
      } catch (error) {
        console.error("Error fetching VIP users:", error);
      }
    };

    fetchVipUsers();
  }, []);

  // Handle Promotion
  const handlePromote = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to promote this user?");
    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }
    setPromoting(userId); // Set loading state to the user ID
    try {
      const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`,
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
            level: "VIP2",
          }),
        }
      );
  
      if (response.ok) {
        setVipUsers(vipUsers.filter((user) => user.id !== userId)); // Update the state to remove the deleted user
        // alert("User promoted successfully!");
        // Optionally, update the UI to reflect the changes
      } else {
        alert("Failed to promote user.");
      }
    } catch (error) {
      console.error("Error promoting user:", error);
    }
    finally {
      setPromoting(null); // Reset loading state
    }
  };
  

  // Handle Deletion
  const handleDelete = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }
  
    setDeleting(userId); // Set loading state to the user ID
  
    try {
      const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setVipUsers(vipUsers.filter((user) => user.id !== userId)); // Update the state to remove the deleted user
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


  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = vipUsers;
  // const currentUsers = vipUsers.slice(indexOfFirstUser, indexOfLastUser);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <div className="container bg-light rounded ">
        <div className="row">
          <div className="table-responsive">
            <table className="table caption-top text-center">
              <caption className="text-center fs-2 fw-bold text-dark py-3">
                VIP 1 Users
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
                {currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{indexOfFirstUser + index + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.invitationCode_display.code}</td>
                    <td>${user.balance}</td>
                    <td>({user.grabbed_orders_count})</td>
                    <td className="d-flex justify-content-center px-3">
                    <button
                        className="timy text-light border-0 px-2 py-1 rounded"
                        onClick={() => handlePromote(user.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {promoting === user.id ? (
                          <button
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                            aria-hidden="true"
                          ></button>
                        ) : (
                          "Promote"
                        )}
                      </button>

                     <button
                        className="bg-danger border-0 text-light px-2 mx-1 py-1 rounded"
                        onClick={() => handleDelete(user.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {deleting === user.id ? (
                          <button
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                            aria-hidden="true"
                          ></button>
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
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({
              length: Math.ceil(vipUsers.length / usersPerPage),
            }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`page-link ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Vip1Details;

{
  /* <td>
  <button
    className="btn btn-primary"
    onClick={() => handlePromote(user.id)}
  >
    Promote
  </button>
  <button
    className="btn btn-danger mx-1"
    onClick={() => handleDelete(user.id)}
  >
    <i className="bi bi-trash3"></i>
  </button>
</td> */
}
