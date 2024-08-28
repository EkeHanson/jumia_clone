// // import React from 'react'
// import "./LastJoined.css";

// const LastJoined = () => {
//   return (
//     <div className="container-fluid">
//       <div className="container bg-light rounded">
//         <h2></h2>
//         <div className="row">

//             <div className="table-responsive">
//               <table className="table caption-top">
//                 <caption className="text-center fs-2 fw-bold text-dark py-3">Last Joined Users</caption>
//                 <thead>
//                   <tr>
//                     <th scope="col">#No.</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">ID Number</th>
//                     <th scope="col">Balance</th>
//                     <th scope="col">Join Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">1</th>
//                     <td>Mark</td>
//                     <td>23311</td>
//                     <td>$0</td>
//                     <td>
//                       <span className="timy text-light px-2 py-1 rounded">
//                         20hr Ago
//                       </span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">2</th>
//                     <td>Jacob</td>
//                     <td>12745622</td>
//                     <td>$0</td>
//                     <td>
//                       <span className="timy text-light px-2 py-1 rounded">
//                         20hr Ago
//                       </span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">3</th>
//                     <td>Larry</td>
//                     <td>43226</td>
//                     <td>$0</td>
//                     <td>
//                       <span className="timy text-light px-2 py-1 rounded">
//                         20hr Ago
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

// export default LastJoined;

import { useEffect, useState } from "react";
import "./LastJoined.css";

const LastJoined = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Number of users to display per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/accounts/users/`); // Replace with your API endpoint
        const data = await response.json();

        // Check the structure of the response
            // Assuming `data` is the array of user objects
        const sortedUsers = data.sort((a, b) => new Date(b.date_joined) - new Date(a.date_joined));

        setUsers(sortedUsers); // Set sorted users to state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [djangoHostname]); // Added dependency to re-fetch data if djangoHostname changes

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid my-5 bg-light rounded">
      <div className="row">
        <div className="table-responsive">
          <table className="table caption-top">
            <caption className="text-center fs-2 fw-bold text-dark py-3">
              Last Joined Users
            </caption>
            <thead>
              <tr>
                <th scope="col">#No.</th>
                <th scope="col">Name</th>
                <th scope="col">ID Number</th>
                <th scope="col">Balance</th>
                <th scope="col">Join Time</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{indexOfFirstUser + index + 1}</th>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.invitationCode_display.code}</td>
                    <td>${user.balance}</td>
                    <td className="d-flex justify-content-center">
                      <span className="timy text-light px-2 py-1 rounded">
                        {new Date(user.date_joined).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {users.length > 0 && (
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
              (_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`page-link ${currentPage === index + 1 ? "active" : ""}`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default LastJoined;
