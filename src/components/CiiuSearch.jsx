import React, { useState, useEffect } from 'react';
import ciiuData from '../data/ciiu.json';
import './CiiuSearch.css';

const CiiuSearch = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (showAll) {
            setResults(ciiuData);
            return;
        }

        if (searchTerm.length > 2) {
            const lowerTerm = searchTerm.toLowerCase();
            const filtered = ciiuData.filter(item =>
                item.code.includes(lowerTerm) ||
                item.description.toLowerCase().includes(lowerTerm) ||
                item.tags.some(tag => tag.toLowerCase().includes(lowerTerm))
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [searchTerm, showAll]);

    const handleSelect = (activity) => {
        setSelectedActivity(activity);
        setSearchTerm(`${activity.code} - ${activity.description}`);
        setResults([]);
        setShowAll(false);
        onSelect(activity);
    };

    const clearSelection = () => {
        setSelectedActivity(null);
        setSearchTerm('');
        onSelect(null);
    };

    const toggleShowAll = () => {
        setShowAll(!showAll);
        if (!showAll) {
            setSearchTerm('');
        }
    };

    return (
        <div className="ciiu-search-container">
            <h3>Actividad Económica Principal</h3>
            <p className="helper-text">Busca por código o palabra clave, o ve la lista completa.</p>

            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Escribe para buscar (ej. programación, médico)..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowAll(false);
                    }}
                    disabled={!!selectedActivity}
                    className={selectedActivity ? 'selected-input' : ''}
                />
                {selectedActivity ? (
                    <button className="clear-btn" onClick={clearSelection}>
                        ✕
                    </button>
                ) : (
                    <button
                        className={`toggle-all-btn ${showAll ? 'active' : ''}`}
                        onClick={toggleShowAll}
                        title={showAll ? "Ocultar lista" : "Ver todas las actividades"}
                    >
                        {showAll ? "Ocultar" : "Ver Lista"}
                    </button>
                )}
            </div>

            {(results.length > 0 && !selectedActivity) && (
                <ul className="results-list">
                    {results.map((item) => (
                        <li key={item.code} onClick={() => handleSelect(item)}>
                            <span className="code">{item.code}</span>
                            <span className="description">{item.description}</span>
                        </li>
                    ))}
                </ul>
            )}

            {searchTerm.length > 2 && results.length === 0 && !selectedActivity && !showAll && (
                <p className="no-results">No se encontraron actividades. Intenta con otra palabra clave o usa "Ver Lista".</p>
            )}
        </div>
    );
};

export default CiiuSearch;
