import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const Sovn = () => {
    const [idag, setIdag] = useState('');
    const [leggerSeg, setLeggerSeg] = useState('');
    const [våkner, setVåkner] = useState('');
    const [antallTimer, setAntallTimer] = useState(0);
    const [antVåken, setAntVåken] = useState(0);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const sovnData = {
            dato: idag,
            leggerSeg,
            våkner,
            antVåken,
            antallTimer
        };

        fetch(`${process.env.REACT_APP_API_URL}/sovn`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(sovnData)
        }).then(() => {
            console.log('Ny søvnlogg opprettet');
            console.log(sovnData);
            history.push('/', { message: 'Søvnlogg er registrert' });
        });
    };

    useEffect(() => {
        // Splitter til format som passer HTML skjema for dato
        const dagensDato = new Date().toISOString().split('T')[0];
        setIdag(dagensDato);
    }, []);

    useEffect(() => {
        if (leggerSeg && våkner) {
            const start = new Date(leggerSeg);
            const end = new Date(våkner);
            const diff = (end - start) / (1000 * 60 * 60); // Difference in hours
            const totalSleep = diff - antVåken; // Subtract awake hours
            setAntallTimer(totalSleep.toFixed(2)); // Set the difference rounded to 2 decimal places
        }
    }, [leggerSeg, våkner, antVåken]);

    return ( 
        <div className="Sovn">
            <h2>Loggføring av søvn</h2>
            <form className="logg-skjema" onSubmit={handleSubmit}>
                <label>
                    Dato (våknet):
                    <input type="date" name="dato" value={idag} />
                </label>
                <label>
                    Når babyen la seg:
                    <input type="datetime-local" name="leggerSeg" value={leggerSeg} onChange={(e) => setLeggerSeg(e.target.value)} />
                </label>
                <label>
                    Når babyen våknet:
                    <input type="datetime-local" name="våkner" value={våkner} onChange={(e) => setVåkner(e.target.value)} />
                </label>
                <label>
                    Ant. timer våken på natten:
                    <input type="number" min="0" name="antallVåknet" value={antVåken} onChange={(e) => setAntVåken(parseFloat(e.target.value) || 0)} />
                </label>
                <label>
                    Antall timer søvn totalt:
                    <input type="number" min="0" name="antallTimer" value={antallTimer} readOnly/>
                </label>
                <button type="submit" className="skjema-knapp">Logg søvn</button>
            </form>
        </div>
    );
}

export default Sovn;