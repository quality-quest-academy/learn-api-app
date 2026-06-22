import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              ⚡ Learn API App
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className="text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/users" 
              className="text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Users
            </Link>
            <Link 
              to="/roles" 
              className="text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
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
