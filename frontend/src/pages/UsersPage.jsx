import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const apiUrl = (path) => `${API_BASE_URL}${path}`;

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(true);

  useEffect(() => {
    if (!successMessage) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(apiUrl('/api/users'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, role }),
      });

      if (response.status === 400) {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid input');
        return;
      }

      if (response.status === 201) {
        const newUser = await response.json();
        // Clear form fields
        setName('');
        setRole('');
        // Append new user to the list
        setUsers([...users, newUser]);
        setSuccessMessage(`User "${newUser.name}" created successfully.`);
      }
    } catch {
      setError('Failed to create user');
    }
  };

  // Fetch users and roles on component mount
  useEffect(() => {
    const loadUsersAndRoles = async () => {
      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          fetch(apiUrl('/api/users')),
          fetch(apiUrl('/api/roles')),
        ]);

        const [usersData, rolesData] = await Promise.all([
          usersResponse.json(),
          rolesResponse.json(),
        ]);

        setUsers(usersData);
        setRoles(rolesData);
        setRole((currentRole) => currentRole || rolesData[0]?.title || '');
        setError('');
      } catch {
        setError('Failed to fetch users and roles');
      } finally {
        setLoading(false);
        setRolesLoading(false);
      }
    };

    loadUsersAndRoles();
  }, []);

  return (
    <div className="space-y-8">
      {successMessage && (
        <div
          className="fixed top-6 right-6 z-50 max-w-sm rounded-xl border border-green-300 bg-green-50 px-5 py-4 shadow-2xl"
          role="status"
          aria-live="polite"
        >
          <p className="font-semibold text-green-800">{successMessage}</p>
        </div>
      )}

      <div className="bg-primary-light rounded-xl shadow-2xl border-2 border-primary-accent p-8">
        <h1 className="text-4xl font-bold text-primary-brown mb-2 border-b-2 border-primary-accent pb-4">
          Users Management
        </h1>
      </div>

      {/* User Creation Form */}
      <div className="bg-primary-light rounded-xl shadow-2xl border-2 border-primary-accent p-8">
        <h2 className="text-2xl font-semibold text-primary-brown mb-6 flex items-center">
          <span className="bg-primary-brown text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">+</span>
          Create New User
        </h2>
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 shadow">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-primary-brown mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white text-primary-text rounded-lg border-2 border-primary-accent focus:outline-none focus:ring-2 focus:ring-primary-brown focus:border-primary-brown transition-all shadow-sm"
              placeholder="Enter user name"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-primary-brown mb-2">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={rolesLoading || roles.length === 0}
              required
              className="w-full px-4 py-3 bg-white text-primary-text rounded-lg border-2 border-primary-accent focus:outline-none focus:ring-2 focus:ring-primary-brown focus:border-primary-brown transition-all shadow-sm"
            >
              <option value="" disabled>
                {rolesLoading ? 'Loading roles...' : 'Select a role'}
              </option>
              {roles.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-brown hover:bg-primary-accent text-primary-light font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Create User
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-primary-light rounded-xl shadow-2xl border-2 border-primary-accent overflow-hidden">
        <div className="bg-primary-brown px-6 py-4">
          <h2 className="text-2xl font-semibold text-primary-light">
            User List
          </h2>
        </div>
        
        {loading ? (
          <div className="px-6 py-12 text-center text-primary-text">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-brown border-t-transparent"></div>
            <p className="mt-4 font-medium">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="px-6 py-12 text-center text-primary-text">
            <p className="text-lg font-medium">No users found</p>
            <p className="text-sm mt-2 text-gray-500">Create your first user using the form above</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-brown">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary-light uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary-light uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary-light uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-primary-accent">
                {users.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className={`hover:bg-primary-bg transition-all duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-brown">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary-text">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-text">
                      {user.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersPage;
