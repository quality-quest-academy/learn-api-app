import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-primary-light rounded-xl shadow-2xl border-2 border-primary-accent p-10">
      <div className="border-l-4 border-primary-brown pl-6">
        <h1 className="text-5xl font-bold text-primary-brown mb-6">
          Welcome to Learn API App
        </h1>
        <p className="text-primary-text text-lg leading-relaxed">
          This is a learning platform for exploring modern web development with React, 
          Tailwind CSS, and RESTful APIs. Use the navigation above to explore different 
          sections of the application.
        </p>
      </div>
      <div className="mt-8 pt-8 border-t-2 border-primary-bg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/users" 
            className="bg-white rounded-lg p-6 border border-primary-accent shadow-md hover:shadow-lg hover:border-primary-brown transition-all cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-primary-brown mb-2">Users</h3>
            <p className="text-primary-text text-sm">Manage and view user information</p>
          </Link>
          <Link 
            to="/roles" 
            className="bg-white rounded-lg p-6 border border-primary-accent shadow-md hover:shadow-lg hover:border-primary-brown transition-all cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-primary-brown mb-2">Roles</h3>
            <p className="text-primary-text text-sm">Configure role assignments</p>
          </Link>
          <a 
            href="http://localhost:5000/api-docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white rounded-lg p-6 border border-primary-accent shadow-md hover:shadow-lg hover:border-primary-brown transition-all cursor-pointer block"
          >
            <h3 className="text-xl font-semibold text-primary-brown mb-2">API</h3>
            <p className="text-primary-text text-sm">RESTful API integration</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
