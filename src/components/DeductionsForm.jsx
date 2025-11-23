import React from 'react';
import CurrencyInput from './CurrencyInput';
import './DeductionsForm.css';

const DeductionsForm = ({ deductionsData, onChange }) => {

    const handleInputChange = (field, value) => {
        onChange(field, value);
    };

    return (
        <div className="deductions-form-container">
            <h3>Deducciones, Rentas Exentas y Anticipos</h3>
            <p className="helper-text">Ingresa los valores anuales pagados en 2025.</p>

            <div className="deductions-grid">
                <div className="form-group">
                    <label>Intereses de Vivienda</label>
                    <CurrencyInput
                        value={deductionsData.interesesVivienda}
                        onChange={(val) => handleInputChange('interesesVivienda', val)}
                        placeholder="0"
                    />
                    <small>Límite anual: 1.200 UVT</small>
                </div>

                <div className="form-group">
                    <label>Medicina Prepagada / Seguros de Salud</label>
                    <CurrencyInput
                        value={deductionsData.medicinaPrepagada}
                        onChange={(val) => handleInputChange('medicinaPrepagada', val)}
                        placeholder="0"
                    />
                    <small>Límite anual: 192 UVT</small>
                </div>

                <div className="form-group">
                    <label>Número de Dependientes Económicos</label>
                    <select
                        value={deductionsData.numberOfDependents || '0'}
                        onChange={(e) => handleInputChange('numberOfDependents', e.target.value)}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4 o más</option>
                    </select>
                    <small className="info-text">
                        Se aplicará la deducción del 10% (Art. 387) y/o la deducción adicional de 72 UVT por dependiente según corresponda.
                    </small>
                </div>

                <div className="form-group">
                    <label>Aportes Voluntarios (AFC, Pensiones Voluntarias)</label>
                    <CurrencyInput
                        value={deductionsData.aportesVoluntarios}
                        onChange={(val) => handleInputChange('aportesVoluntarios', val)}
                        placeholder="0"
                    />
                </div>

                <div className="form-group">
                    <label>Retención en la Fuente (Año 2025)</label>
                    <CurrencyInput
                        value={deductionsData.retenciones}
                        onChange={(val) => handleInputChange('retenciones', val)}
                        placeholder="0"
                    />
                    <small>Valor total que le retuvieron durante el año.</small>
                </div>

                <div className="form-group">
                    <label>¿Cuántas veces ha declarado renta anteriormente?</label>
                    <select
                        value={deductionsData.declarationCount || '0'}
                        onChange={(e) => handleInputChange('declarationCount', e.target.value)}
                    >
                        <option value="0">Ninguna (Primera vez)</option>
                        <option value="1">Una vez</option>
                        <option value="2">Dos veces o más</option>
                    </select>
                    <small className="info-text">
                        Esto determina el porcentaje del anticipo de renta (25%, 50% o 75%).
                    </small>
                </div>
            </div>
        </div>
    );
};

export default DeductionsForm;
