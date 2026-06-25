import { useState, useEffect } from 'react';

function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [title, setTitle] = useState('');
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
        body: JSON.stringify({ title }),
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
    <div className="space-y-8">
      <div className="bg-primary-light rounded-xl shadow-2xl border-2 border-primary-accent p-8">
        <h1 className="text-4xl font-bold text-primary-brown mb-2 border-b-2 border-primary-accent pb-4">
          Roles Management
        </h1>
      </div>

      {/* Role Creation Form */}
      <div className="bg-primary-light rounded-xl shadow-2xl border-2 border-primary-accent p-8">
        <h2 className="text-2xl font-semibold text-primary-brown mb-6 flex items-center">
          <span className="bg-primary-brown text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">+</span>
          Create New Role
        </h2>
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 shadow">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-primary-brown mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white text-primary-text rounded-lg border-2 border-primary-accent focus:outline-none focus:ring-2 focus:ring-primary-brown focus:border-primary-brown transition-all shadow-sm"
              placeholder="Enter role title"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-brown hover:bg-primary-accent text-primary-light font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Create Role
          </button>
        </form>
      </div>

      {/* Roles Table */}
      <div className="bg-primary-light rounded-xl shadow-2xl border-2 border-primary-accent overflow-hidden">
        <div className="bg-primary-brown px-6 py-4">
          <h2 className="text-2xl font-semibold text-primary-light">
            Role List
          </h2>
        </div>
        
        {loading ? (
          <div className="px-6 py-12 text-center text-primary-text">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-brown border-t-transparent"></div>
            <p className="mt-4 font-medium">Loading roles...</p>
          </div>
        ) : roles.length === 0 ? (
          <div className="px-6 py-12 text-center text-primary-text">
            <p className="text-lg font-medium">No roles found</p>
            <p className="text-sm mt-2 text-gray-500">Create your first role using the form above</p>
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
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary-light uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-primary-accent">
                {roles.map((role, index) => (
                  <tr 
                    key={role.id} 
                    className={`hover:bg-primary-bg transition-all duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-brown">
                      {role.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary-text">
                      {role.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDelete(role.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        Delete
                      </button>
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

export default RolesPage;
