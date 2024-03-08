import { Button, Navbar } from 'flowbite-react';
import Logo from "./Assets/logo_header_light.png"

function Navbarlp() {
  
  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg">
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <span className="text-2xl text-gray-900 font-semibold">
        <img src={Logo} alt="logo" className="h-10 w-40" />
        </span>
        <div className="flex space-x-4 text-gray-900">
          <a href="#">Dashboard</a>
          <a href="#">About</a>
          <a href="#">Projects</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
  </nav>
  );
}

export default Navbarlp