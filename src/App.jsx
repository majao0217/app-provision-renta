import React, { useState, useRef } from 'react';
import PreCheck from './components/PreCheck';
import CiiuSearch from './components/CiiuSearch';
import IncomeSelection from './components/IncomeSelection';
import DynamicIncomeForm from './components/DynamicIncomeForm';
import DeductionsForm from './components/DeductionsForm';
import { calculateTaxProvision } from './utils/taxLogic2025';
import html2pdf from 'html2pdf.js';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);
  const [ciiuActivity, setCiiuActivity] = useState(null);
  const [selectedIncomes, setSelectedIncomes] = useState([]);
  const [incomeData, setIncomeData] = useState({});
  const [deductionsData, setDeductionsData] = useState({});
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const handlePreCheckComplete = (data) => {
    setUserData(data);
    setStep(2);
  };

  const handleCiiuSelect = (activity) => {
    setCiiuActivity(activity);
  };

  const handleIncomeSelectionChange = (selection) => {
    setSelectedIncomes(selection);
  };

  const handleIncomeDataChange = (type, field, value) => {
    setIncomeData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const handleDeductionsChange = (field, value) => {
    setDeductionsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculate = () => {
    const res = calculateTaxProvision(incomeData, deductionsData);
    setResult(res);
    setStep(6);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  const exportPDF = () => {
    const element = resultRef.current;
    const opt = {
      margin: 1,
      filename: `proyeccion_renta_2025_${userData.name.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Calculador de Renta 2025</h1>
        {userData && <div className="user-info">Hola, {userData.name}</div>}
      </header>

      <main className="app-content">
        {step === 1 && (
          <PreCheck onComplete={handlePreCheckComplete} />
        )}

        {step === 2 && (
          <div className="step-container">
            <CiiuSearch onSelect={handleCiiuSelect} />
            {ciiuActivity && (
              <div className="selected-activity-summary">
                <strong>Actividad seleccionada:</strong> {ciiuActivity.code} - {ciiuActivity.description}
                <button className="btn-link" onClick={() => setStep(3)}>Continuar</button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="step-container">
            <IncomeSelection selectedIncomes={selectedIncomes} onChange={handleIncomeSelectionChange} />
            <div className="actions">
              <button className="btn-secondary" onClick={() => setStep(2)}>Atrás</button>
              <button
                className="btn-primary"
                onClick={() => setStep(4)}
                disabled={selectedIncomes.length === 0}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-container">
            <DynamicIncomeForm
              selectedIncomes={selectedIncomes}
              incomeData={incomeData}
              onChange={handleIncomeDataChange}
            />
            <div className="actions">
              <button className="btn-secondary" onClick={() => setStep(3)}>Atrás</button>
              <button className="btn-primary" onClick={() => setStep(5)}>Siguiente</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="step-container">
            <DeductionsForm
              deductionsData={deductionsData}
              onChange={handleDeductionsChange}
            />
            <div className="actions">
              <button className="btn-secondary" onClick={() => setStep(4)}>Atrás</button>
              <button className="btn-primary" onClick={calculate}>Calcular Provisión</button>
            </div>
          </div>
        )}

        {step === 6 && result && (
          <div className="result-container">
            <h2>Resultado de tu Proyección</h2>

            <div className="result-card" ref={resultRef}>
              <div className="report-header">
                <h3>Reporte de Proyección Impuesto de Renta 2025</h3>
                <p><strong>Contribuyente:</strong> {userData.name}</p>
                <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
                <hr />
              </div>

              <div className="result-row">
                <span>Ingresos Brutos Totales</span>
                <span>{formatCurrency(result.grossIncome)}</span>
              </div>
              <div className="result-row">
                <span>Ingresos No Constitutivos de Renta (Seguridad Social)</span>
                <span>- {formatCurrency(result.breakdown.incr)}</span>
              </div>
              <div className="result-row">
                <span>Costos y Gastos Procedentes</span>
                <span>- {formatCurrency(result.costs)}</span>
              </div>
              <div className="result-row highlight">
                <span>Ingreso Neto</span>
                <span>{formatCurrency(result.netIncome)}</span>
              </div>

              <div className="breakdown-section">
                <h4>Detalle de Deducciones y Rentas Exentas</h4>
                <div className="sub-row">
                  <span>Intereses de Vivienda</span>
                  <span>{formatCurrency(result.breakdown.deductions.housingInterest)}</span>
                </div>
                <div className="sub-row">
                  <span>Medicina Prepagada</span>
                  <span>{formatCurrency(result.breakdown.deductions.prepaidMedicine)}</span>
                </div>
                <div className="sub-row">
                  <span>Deducción Dependientes (10% - Sujeta a Límite)</span>
                  <span>{formatCurrency(result.breakdown.deductions.dependentsStandard)}</span>
                </div>
                <div className="sub-row">
                  <span>Deducción Dependientes (72 UVT - Sin Límite)</span>
                  <span>{formatCurrency(result.breakdown.deductions.dependentsAdditional)}</span>
                </div>
                <div className="sub-row">
                  <span>Aportes Voluntarios (AFC/Pensiones)</span>
                  <span>{formatCurrency(result.breakdown.exemptions.voluntaryContributions)}</span>
                </div>
                <div className="sub-row">
                  <span>Renta Exenta del 25%</span>
                  <span>{formatCurrency(result.breakdown.exemptions.exempt25)}</span>
                </div>
                <div className="sub-row limit-info">
                  <span>Límite Global del 40% (o 1340 UVT)</span>
                  <span>{formatCurrency(result.breakdown.limits.globalLimit)}</span>
                </div>
              </div>

              <div className="result-row">
                <span>Total Deducciones y Rentas Exentas (Limitadas)</span>
                <span>- {formatCurrency(result.totalDeductions)}</span>
              </div>
              <div className="result-row highlight">
                <span>Renta Líquida Gravable</span>
                <span>{formatCurrency(result.taxableBase)}</span>
              </div>

              <div className="result-row">
                <span>Impuesto a Cargo</span>
                <span>{formatCurrency(result.breakdown.tax.taxLiability)}</span>
              </div>
              <div className="result-row">
                <span>Menos: Retenciones en la Fuente</span>
                <span>- {formatCurrency(result.breakdown.tax.withholdings)}</span>
              </div>
              <div className="result-row">
                <span>Más: Anticipo de Renta (Año Siguiente)</span>
                <span>+ {formatCurrency(result.breakdown.tax.advance)}</span>
              </div>

              <div className="tax-total">
                <h3>Total a Pagar (o Saldo a Favor)</h3>
                <div className="amount">{formatCurrency(result.breakdown.tax.totalPayable)}</div>
              </div>

              <div className="disclaimer">
                <small>Este reporte es una proyección estimada basada en la normativa vigente para el año gravable 2025. No reemplaza la asesoría de un contador profesional.</small>
              </div>
            </div>

            <div className="actions">
              <button className="btn-secondary" onClick={() => setStep(1)}>Nuevo Cálculo</button>
              <button className="btn-primary" onClick={exportPDF}>Descargar PDF</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
