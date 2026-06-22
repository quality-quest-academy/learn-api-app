import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-primary-brown border-b-2 border-primary-accent shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-light">
              ⚡ Learn API App
            </Link>
          </div>
          <div className="flex space-x-2">
            <Link 
              to="/" 
              className="text-primary-light hover:bg-primary-accent hover:text-white px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200"
            >
              Home
            </Link>
            <Link 
              to="/users" 
              className="text-primary-light hover:bg-primary-accent hover:text-white px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200"
            >
              Users
            </Link>
            <Link 
              to="/roles" 
              className="text-primary-light hover:bg-primary-accent hover:text-white px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200"
            >
              Roles
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
