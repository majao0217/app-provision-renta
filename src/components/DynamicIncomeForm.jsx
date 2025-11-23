import React from 'react';
import CurrencyInput from './CurrencyInput';
import './DynamicIncomeForm.css';

const DynamicIncomeForm = ({ selectedIncomes, incomeData, onChange }) => {

    const handleInputChange = (type, field, value) => {
        onChange(type, field, value);
    };

    const renderSocialSecurityInputs = (type, excludeArl = false) => (
        <div className="ss-section">
            <h5>Aportes a Seguridad Social (Año 2025)</h5>
            <div className="form-group-row">
                <div className="form-group">
                    <label>Salud</label>
                    <CurrencyInput
                        value={incomeData[type]?.salud}
                        onChange={(val) => handleInputChange(type, 'salud', val)}
                        placeholder="0"
                    />
                </div>
                <div className="form-group">
                    <label>Pensión</label>
                    <CurrencyInput
                        value={incomeData[type]?.pension}
                        onChange={(val) => handleInputChange(type, 'pension', val)}
                        placeholder="0"
                    />
                </div>
                {!excludeArl && (
                    <div className="form-group">
                        <label>ARL</label>
                        <CurrencyInput
                            value={incomeData[type]?.arl}
                            onChange={(val) => handleInputChange(type, 'arl', val)}
                            placeholder="0"
                        />
                    </div>
                )}
            </div>
        </div>
    );

    const renderFormForType = (type) => {
        switch (type) {
            case 'rentas_laborales_asalariado':
                return (
                    <div key={type} className="income-form-section">
                        <h4>Rentas de Trabajo (Asalariado)</h4>
                        <div className="form-group">
                            <label>Ingresos Brutos</label>
                            <CurrencyInput
                                value={incomeData[type]?.ingresosBrutos}
                                onChange={(val) => handleInputChange(type, 'ingresosBrutos', val)}
                                placeholder="0"
                            />
                        </div>
                        <small className="info-text">
                            Se aplicará automáticamente el 25% de renta exenta (si aplica) y la deducción de dependientes completa.
                        </small>
                        {/* Exclude ARL for Asalariado */}
                        {renderSocialSecurityInputs(type, true)}
                    </div>
                );

            case 'rentas_laborales_independiente':
                const deductionType = incomeData[type]?.deductionType || '25_exempt';
                return (
                    <div key={type} className="income-form-section">
                        <h4>Rentas de Trabajo (Independiente)</h4>
                        <div className="form-group">
                            <label>Ingresos Brutos</label>
                            <CurrencyInput
                                value={incomeData[type]?.ingresosBrutos}
                                onChange={(val) => handleInputChange(type, 'ingresosBrutos', val)}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-group toggle-group">
                            <label>Método de Depuración</label>
                            <div className="radio-options">
                                <label>
                                    <input
                                        type="radio"
                                        name={`labor_deduction_type_${type}`}
                                        value="25_exempt"
                                        checked={deductionType === '25_exempt'}
                                        onChange={(e) => handleInputChange(type, 'deductionType', e.target.value)}
                                    />
                                    Aplicar 25% de Renta Exenta
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name={`labor_deduction_type_${type}`}
                                        value="costs"
                                        checked={deductionType === 'costs'}
                                        onChange={(e) => handleInputChange(type, 'deductionType', e.target.value)}
                                    />
                                    Deducir Costos y Gastos
                                </label>
                            </div>
                        </div>

                        {deductionType === 'costs' && (
                            <div className="form-group">
                                <label>Costos y Gastos Procedentes</label>
                                <CurrencyInput
                                    value={incomeData[type]?.costosGastos}
                                    onChange={(val) => handleInputChange(type, 'costosGastos', val)}
                                    placeholder="0"
                                />
                                <small>Relacionados con la actividad y debidamente soportados (factura electrónica).</small>
                            </div>
                        )}

                        {renderSocialSecurityInputs(type)}
                    </div>
                );

            case 'rentas_capital':
                return (
                    <div key={type} className="income-form-section">
                        <h4>Rentas de Capital</h4>
                        <div className="form-group">
                            <label>Ingresos Brutos</label>
                            <CurrencyInput
                                value={incomeData[type]?.ingresosBrutos}
                                onChange={(val) => handleInputChange(type, 'ingresosBrutos', val)}
                                placeholder="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Costos y Gastos Procedentes</label>
                            <CurrencyInput
                                value={incomeData[type]?.costosGastos}
                                onChange={(val) => handleInputChange(type, 'costosGastos', val)}
                                placeholder="0"
                            />
                        </div>
                        {renderSocialSecurityInputs(type)}
                    </div>
                );
            case 'rentas_no_laborales':
                return (
                    <div key={type} className="income-form-section">
                        <h4>Rentas No Laborales</h4>
                        <div className="form-group">
                            <label>Ingresos Brutos</label>
                            <CurrencyInput
                                value={incomeData[type]?.ingresosBrutos}
                                onChange={(val) => handleInputChange(type, 'ingresosBrutos', val)}
                                placeholder="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Costos y Gastos Procedentes</label>
                            <CurrencyInput
                                value={incomeData[type]?.costosGastos}
                                onChange={(val) => handleInputChange(type, 'costosGastos', val)}
                                placeholder="0"
                            />
                        </div>
                        {renderSocialSecurityInputs(type)}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="dynamic-income-form-container">
            <h3>Detalle de Ingresos</h3>
            <p className="helper-text">Ingresa los valores correspondientes a cada fuente de ingreso seleccionada.</p>
            {selectedIncomes.map(type => renderFormForType(type))}
        </div>
    );
};

export default DynamicIncomeForm;
