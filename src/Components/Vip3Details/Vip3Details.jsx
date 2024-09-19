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
import SearchL from "../SearchL/SearchL";

const Vip3Details = () => {
  const [vip3Users, setVip3Users] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [promoting, setPromoting] = useState(null);
  const [demoting, setDemoting] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const usersPerPage = 10;

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  // useEffect(() => {
  //   const fetchVip3Users = async (page = 1) => {
  //     try {
  //       const response = await fetch(`${djangoHostname}/api/accounts/users/by-level/VIP3/`);
  //       const data = await response.json();
  //       setVip3Users(data);
  //       setFilteredUsers(data); // Initialize filtered users
  //       setTotalPages(Math.ceil(data.count / usersPerPage));
  //     } catch (error) {
  //       console.error("Error fetching VIP 3 users:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVip3Users(currentPage);
  // }, [currentPage]);
  useEffect(() => {
    const fetchVip3Users = async (page = 1) => {
      try {
        const response = await fetch(`${djangoHostname}/api/accounts/users/by-level/VIP3/`);
        const data = await response.json();
       // console.log(data);  // Check the structure of data
        setVip3Users(data.results); // Assuming 'results' contains the array of users
        setFilteredUsers(data.results); // Ensure this is an array
        setTotalPages(Math.ceil(data.count / usersPerPage));
      } catch (error) {
        console.error("Error fetching VIP 3 users:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVip3Users(currentPage);
  }, [currentPage]);
  
  

  const handleSearch = (query) => {
    const filtered = vip3Users.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
      (user.invitationCode_display && user.invitationCode_display.code.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredUsers(filtered); // Update the state with the filtered users
    setCurrentPage(1); // Reset to first page on search
  };

  const indexOfFirstUser = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfFirstUser + usersPerPage); // Paginated current users

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Pagination logic for limiting pages to 10 displayed at a time
  const pageNumbers = Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
    const start = Math.max(0, currentPage - 5);
    return start + i + 1;
  });

  const deleteUser = async (userId) => {
    // deletion logic...
  };

  const promoteToVip3 = async (userId) => {
    // promotion logic...
  };

  const demoteToVip2 = async (userId) => {
    // demotion logic...
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
            <SearchL onSearch={handleSearch} />
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
                {currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{indexOfFirstUser + index + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.invitationCode_display?.code || "N9e75e38a6dA"}</td>
                    <td>${user.balance}</td>
                    <td>({user.grabbed_orders_count})</td>
                    <td className="d-flex justify-content-center">
                      <button
                        className="btn btn-warning text-light text-center w-100 px-2 py-1 rounded mx-1"
                        onClick={() => demoteToVip2(user.id)}
                        disabled={demoting === user.id}
                      >
                        {demoting === user.id ? (
                          <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                        ) : (
                          "Demote"
                        )}
                      </button>

                      <button
                        className="btn btn-danger text-light px-2 py-1 rounded mx-1"
                        onClick={() => deleteUser(user.id)}
                        disabled={deleting === user.id}
                      >
                        {deleting === user.id ? (
                          <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
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

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePrevPage}>
              Previous
            </button>
          </li>
          {pageNumbers.map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Vip3Details;
