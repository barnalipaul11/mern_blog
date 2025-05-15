import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  Menu, X, BookOpen, Briefcase, Home, User, PenSquare, Info, ChevronDown
} from 'lucide-react';
import { RouteIndex, RouteProfile, RouteSignIn } from '../../helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { removeUser, setUser } from '@/redux/user/user.slice';


const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/blogs', label: 'Interview Experiences', icon: BookOpen },
  { to: '/opportunities', label: 'Opportunities', icon: Briefcase },
  { to: '/blog/add', label: 'Share Your Story', icon: PenSquare },
  { to: '/blog', label: 'Dashboard', icon: User },
  { to: '/about-us', label: 'About Us', icon: Info },
];

const navItems2 = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/blogs', label: 'Interview Experiences', icon: BookOpen },
  { to: '/jobs', label: 'Opportunities', icon: Briefcase },
  { to: '/about-us', label: 'About Us', icon: Info },
];

function Navbar() {
  const dispath=useDispatch()
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const user = useSelector((state) => state.user);
  const handleLogout=async()=>{
       try {
          const response= await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`,{
            method:'get',
            credentials:'include',
           
          })
  
          const data=await response.json()
          if(!response.ok){
            return showToast('error',data.message)
          }
          dispath(removeUser())
          navigate(RouteIndex)
          showToast('success',data.message)
  
      } catch (error) {
          showToast('error',error.message)
        }
  }






  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-2 text-foreground">
            <span className="text-xl font-bold tracking-tight text-primary">
              CareerConnect
            </span>
          </NavLink>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {(user.isLoggedIn ? navItems : navItems2).map((item) => (
                    <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary/90 ${
                    isActive ? 'text-primary' : 'text-foreground/70'
                  }`
                }
              >
                {item.label}
              </NavLink>
              ))}

          

            {!user.isLoggedIn ? (
              <Link to={RouteSignIn}>
                <Button variant="default" size="sm">Log In</Button>
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-muted hover:bg-muted/80"
                >
                  {user.user?.name || 'Account'}
                  <ChevronDown size={16} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-10">
                    <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-accent">Profile</Link>
                    <Link to="/settings" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-accent">Settings</Link>
                    <Link to="/my-posts" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-accent">My Posts</Link>
                    <button
                      onClick={() => {
                        handleLogout();  
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-accent"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/90 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fadeIn">
          <div className="container mx-auto px-4 py-3 space-y-2">
            {(user.isLoggedIn ? navItems : navItems2).map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center py-3 px-4 text-sm font-medium rounded-md transition-colors hover:bg-accent ${
                    isActive ? 'text-primary bg-accent/50' : 'text-foreground/70'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
              </NavLink>
            ))}

            {!user.isLoggedIn ? (
              <div className="pt-2 pb-4">
                <Link to={RouteSignIn}>
                  <Button variant="default" className="w-full">Login</Button>
                </Link>
              </div>
            ) : (
              <div className="pt-2 pb-4">
                <button
                  onClick={toggleDropdown}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium bg-muted rounded-md hover:bg-muted/80"
                >
                  {user.user?.name || 'Account'}
                  <ChevronDown size={16} />
                </button>

                {dropdownOpen && (
                  <div className="mt-2 bg-muted rounded-md shadow-md overflow-hidden">
                    <Link to={RouteProfile} onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-accent">Profile</Link>
                    <Link to="/settings" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-accent">Settings</Link>
                    <Link to="/my-posts" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-accent">My Posts</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-accent text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
