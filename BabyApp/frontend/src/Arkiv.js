import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Arkiv = () => {
    const [babyData, setBabyData] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Assuming you have a specific baby ID to fetch data for
        const babyId = "6787679af8e19d69b8b1bac3"; // Replace with actual baby ID

        console.log(`Fetching data for baby ID: ${babyId}`);
        axios.get(`https://baby-app123321-1af15b4e337d.herokuapp.com/babyer/${babyId}`) // Oppdater URL-en her
            .then(response => {
                console.log('Baby data fetched successfully:', response.data);
                setBabyData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching baby data:', error);
                setError('Error fetching baby data');
                setLoading(false);
            });
    }, []);

    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };

    if (loading) {
        console.log('Still loading...');
        return <div>Loading...</div>; // This is where "Loading..." is displayed
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!babyData) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <h1>Baby Data</h1>
            <button onClick={handleSort}>Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}</button>
            <h2>Søvn</h2>
            <table>
                <thead>
                    <tr>
                        <th>Dato</th>
                        <th>Legger Seg</th>
                        <th>Våkner</th>
                        <th>Ant. Timer Våken</th>
                        <th>Antall Timer Søvn</th>
                    </tr>
                </thead>
                <tbody>
                    {babyData.sovn && babyData.sovn.length > 0 ? (
                        babyData.sovn.map((sovn, index) => (
                            <tr key={index}>
                                <td>{sovn.dato}</td>
                                <td>{sovn.leggerSeg}</td>
                                <td>{sovn.våkner}</td>
                                <td>{sovn.antVåken}</td>
                                <td>{sovn.antallTimer}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No sleep data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>Mat</h2>
            <table>
                <thead>
                    <tr>
                        <th>Dato</th>
                        <th>Kl. Slett</th>
                        <th>Type Mat</th>
                        <th>Mengde Spist</th>
                    </tr>
                </thead>
                <tbody>
                    {babyData.mat && babyData.mat.length > 0 ? (
                        babyData.mat.map((mat, index) => (
                            <tr key={index}>
                                <td>{mat.idag}</td>
                                <td>{mat.klSlett}</td>
                                <td>{mat.typeMat}</td>
                                <td>{mat.mengdeSpist}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No food data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>Do</h2>
            <table>
                <thead>
                    <tr>
                        <th>Dato</th>
                        <th>Kl. Slett</th>
                        <th>Konsistens</th>
                        <th>Mengde</th>
                    </tr>
                </thead>
                <tbody>
                    {babyData.do && babyData.do.length > 0 ? (
                        babyData.do.map((doData, index) => (
                            <tr key={index}>
                                <td>{doData.dato}</td>
                                <td>{doData.klSlett}</td>
                                <td>{doData.konsistens}</td>
                                <td>{doData.mengde}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No do data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Arkiv;