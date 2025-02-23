import { Link } from "react-router-dom";
const Navbar = () => {
    return ( 
        <nav className="Navbar">
            <div className="header">
                <h1>Baby loggføring</h1>
                <Link to="/" className="hjem-knapp">Hjem</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;