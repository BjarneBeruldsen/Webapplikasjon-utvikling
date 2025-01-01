import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>Sorry</h2>
            <p>Denne siden kan ikke bli funnet</p>
            <Link to="/">Tilbake til hjemmesiden..</Link>
        </div>
     );
}
 
export default NotFound;