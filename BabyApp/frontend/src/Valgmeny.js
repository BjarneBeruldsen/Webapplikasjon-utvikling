import { Link, useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";

const Valgmeny = () => {
    const location = useLocation();
    const history = useHistory();
    const message = location.state?.message;

    useEffect(() => {
        if (message) {
            // Nullstill meldingen i state før alerten vises
            history.replace({ ...location, state: {} });
            alert(message);
        }
    }, [message, history, location]);

    return ( 
        <div className="Valgmeny">
            <Link to="/arkiv" className="knapp">Arkiv</Link>
            <Link to="/mat" className="knapp">Mat</Link>
            <Link to="/do" className="knapp">Do</Link>
            <Link to="/sovn" className="knapp">Søvn</Link>
        </div>
     );
}
 
export default Valgmeny;