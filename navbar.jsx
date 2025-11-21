import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold text-blue-700">ServicePoint SA</h1>

        <div className="flex space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/services" className="hover:text-blue-600">Services</Link>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </nav>
  );
}
