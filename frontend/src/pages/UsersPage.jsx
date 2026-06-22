import { useState, useEffect } from 'react';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users', {
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
      }
    } catch (err) {
      setError('Failed to create user');
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        Users
      </h1>

      {/* User Creation Form */}
      <div className="mb-8 bg-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Create New User</h2>
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-600 text-white px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-600 text-white rounded border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user name"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-2">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-slate-600 text-white rounded border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user role"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Create User
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-slate-700 rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold text-white px-6 py-4 bg-slate-600">
          User List
        </h2>
        
        {loading ? (
          <div className="px-6 py-8 text-center text-slate-400">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="px-6 py-8 text-center text-slate-400">
            No users found
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-600">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-600 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UsersPage;
