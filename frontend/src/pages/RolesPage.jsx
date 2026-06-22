import { useState, useEffect } from 'react';

function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/roles');
      const data = await response.json();
      setRoles(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, department }),
      });

      if (response.status === 400) {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid input');
        return;
      }

      if (response.status === 201) {
        const newRole = await response.json();
        // Clear form fields
        setTitle('');
        setDepartment('');
        // Append new role to the list
        setRoles([...roles, newRole]);
      }
    } catch (err) {
      setError('Failed to create role');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/roles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted role from state
        setRoles(roles.filter(role => role.id !== id));
        setError('');
      } else {
        setError('Failed to delete role');
      }
    } catch (err) {
      setError('Failed to delete role');
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        Roles
      </h1>

      {/* Role Creation Form */}
      <div className="mb-8 bg-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Create New Role</h2>
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-600 text-white px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-slate-600 text-white rounded border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter role title"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-300 mb-2">
              Department
            </label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 bg-slate-600 text-white rounded border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter department"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Create Role
          </button>
        </form>
      </div>

      {/* Roles Table */}
      <div className="bg-slate-700 rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold text-white px-6 py-4 bg-slate-600">
          Role List
        </h2>
        
        {loading ? (
          <div className="px-6 py-8 text-center text-slate-400">
            Loading roles...
          </div>
        ) : roles.length === 0 ? (
          <div className="px-6 py-8 text-center text-slate-400">
            No roles found
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-600">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-slate-600 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {role.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {role.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {role.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDelete(role.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                    >
                      Delete
                    </button>
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

export default RolesPage;
