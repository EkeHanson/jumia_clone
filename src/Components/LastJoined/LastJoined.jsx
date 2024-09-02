import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./LastJoined.css";
import SearchL from "../SearchL/SearchL";

const LastJoined = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
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
        setFilteredUsers(sortedUsers); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [djangoHostname]);

  const handleSearch = (query) => {
    const filtered = users.filter(user => 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
      user.invitationCode_display.code.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid my-5 bg-light rounded">
      <div className="row">
        <SearchL onSearch={handleSearch} />
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
                    <td>
                      <Link to={`/profile?userId=${user.id}`} className="text-decoration-none text-dark">
                        {user.firstName} {user.lastName}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/profile?userId=${user.id}`} className="text-decoration-none text-dark">
                        {user.invitationCode_display.code}
                      </Link>
                    </td>
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
      {filteredUsers.length > 0 && (
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map(
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
