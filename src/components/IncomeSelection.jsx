import React from 'react';
import './IncomeSelection.css';

const IncomeSelection = ({ selectedIncomes, onChange }) => {
    const incomeTypes = [
        { id: 'rentas_laborales_asalariado', label: 'Rentas de Trabajo (Asalariado)', description: 'Vinculación laboral formal, sueldos, prestaciones.' },
        { id: 'rentas_laborales_independiente', label: 'Rentas de Trabajo (Independiente)', description: 'Honorarios, servicios, comisiones sin vínculo laboral.' },
        { id: 'rentas_capital', label: 'Rentas de Capital', description: 'Intereses, rendimientos financieros, arrendamientos, regalías.' },
        { id: 'rentas_no_laborales', label: 'Rentas No Laborales', description: 'Comercio, venta de activos, otras actividades no clasificadas.' },
    ];

    const handleCheckboxChange = (id) => {
        const newSelection = selectedIncomes.includes(id)
            ? selectedIncomes.filter(item => item !== id)
            : [...selectedIncomes, id];
        onChange(newSelection);
    };

    return (
        <div className="income-selection-container">
            <h3>Fuentes de Ingreso</h3>
            <p className="helper-text">Selecciona todas las fuentes de ingreso que tuviste en el año gravable 2025.</p>

            <div className="income-options">
                {incomeTypes.map((type) => (
                    <label key={type.id} className={`income-card ${selectedIncomes.includes(type.id) ? 'selected' : ''}`}>
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                checked={selectedIncomes.includes(type.id)}
                                onChange={() => handleCheckboxChange(type.id)}
                            />
                        </div>
                        <div className="card-content">
                            <span className="card-title">{type.label}</span>
                            <span className="card-description">{type.description}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default IncomeSelection;
