import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const Do = () => {
    const [naa, setNaa] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const doData = {
            dato: naa,
            klSlett: e.target.klSlett.value,
            konsistens: e.target.konsistens.value,
            mengde: e.target.vol.value
        };

        fetch(`${process.env.REACT_APP_API_URL}/do`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(doData)
        }).then(() => {
            console.log('Ny do-logg opprettet');
            console.log(doData);
            history.push('/', { message: 'Do-logg er registrert' });
        });
    };

    useEffect(() => {
        // Splitter til format som passer HTML skjema for dato
        const tidspunktNaa = new Date().toISOString().split('T')[0];
        setNaa(tidspunktNaa);
    }, []);

    return ( 
        <div className="Do">
            <h2>Loggføring av do</h2>
            <form className="logg-skjema" onSubmit={handleSubmit}>
                <label>
                    Dato:
                    <input type="date" name="dato" value={naa} required />
                </label>
                <label>
                    Kl.slett:
                    <input type="time" name="klSlett" required />
                </label>
                <label>
                    Konsistens:
                    <input type="text" name="konsistens" required />
                </label>
                <label>
                    Mengde (0-100):
                    <input type="range" id="vol" name="vol" min="0" max="100" />
                </label>
                <button type="submit" className="skjema-knapp">Logg do</button>
            </form>
        </div>
     );
}

export default Do;