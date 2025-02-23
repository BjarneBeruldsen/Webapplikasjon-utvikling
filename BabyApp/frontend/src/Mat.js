import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Mat = () => {
    const [idag, setIdag] = useState('');
    const [typeMat, setTypeMat] = useState('');
    const [mengdeSpist, setMengdeSpist] = useState('');
    const [klSlett, setKlSlett] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const mat = { idag, typeMat, mengdeSpist, klSlett };

        fetch('https://baby-app123321-1af15b4e337d.herokuapp.com/mat', { // Oppdater URL-en her
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(mat)
        }).then(() => { 
            console.log('Ny matlogg opprettet');
            console.log(mat); 
            history.push('/', { message: 'Matlogging er registrert' });
        })
    }

    useEffect(() => {
        // Splitter til format som passer HTML skjema for dato
        const dagensDato = new Date().toISOString().split('T')[0];
        setIdag(dagensDato);
    }, []);

    return ( 
        <div className="Mat">
            <h2>Loggføring av mat</h2>
            <form className="logg-skjema" onSubmit={handleSubmit}>
                <label>
                    Dato:
                    <input type="date" name="dato" value={idag} onChange={(e) => setIdag(e.target.value)} required />
                </label>
                <label>
                    Type mat:
                    <input type="text" name="typeMat" value={typeMat} onChange={(e) => setTypeMat(e.target.value)} required />
                </label>
                <label>
                    Mengde spist (antall t-skjeer):
                    <input type="number" name="mengdeSpist" value={mengdeSpist} onChange={(e) => setMengdeSpist(e.target.value)} min="0" required />
                </label>
                <label>
                    Kl.slett:
                    <input type="time" name="klSlett" value={klSlett} onChange={(e) => setKlSlett(e.target.value)} required />
                </label>
                <button type="submit" className="skjema-knapp">Logg mat</button>
            </form>
        </div>
    );
}

export default Mat;