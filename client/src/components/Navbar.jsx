import { Link } from 'react-router-dom';

const Navbar = () => {
  

  return (
    <div className="navbar bg-base-100 fixed">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
             viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" 
             strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/donor/dashboard" className='nav-link hover:text-secondary'>Home</Link></li>
            <li><Link className='nav-link hover:text-secondary'>Admin</Link></li>
            <li><Link to= "/donor/dashboard/profile" className='nav-link hover:text-secondary'>Profile</Link></li>
            <li><Link className='nav-link hover:text-secondary'>Logout</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
          <a className=" btn btn-ghost text-2xl font-bold">XYZ</a>
      </div>
    </div>
  );
};

export default Navbar;