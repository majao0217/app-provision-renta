import React from 'react';

export default function ResultsView({ results, onReset }) {
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="card fade-in">
            <h1>Resultado de Provisión</h1>
            <p className="text-muted">Estimado para el año gravable 2025</p>

            <div style={{ margin: '2rem 0', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--color-text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Impuesto a Pagar Estimado</h3>
                <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--color-primary)', margin: '0.5rem 0' }}>
                    {formatCurrency(results.taxLiability)}
                </div>
                <p className="text-muted">Este valor es una proyección basada en los datos suministrados.</p>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Ingresos Brutos Totales</span>
                    <strong>{formatCurrency(results.grossIncome)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>
                    <span>(-) Costos y Gastos Procedentes</span>
                    <span>{formatCurrency(results.costs)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderTop: '1px solid #ddd', paddingTop: '0.5rem' }}>
                    <strong>Ingreso Neto</strong>
                    <strong>{formatCurrency(results.netIncome)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--color-success)' }}>
                    <span>(-) Deducciones y Rentas Exentas</span>
                    <span>{formatCurrency(results.totalDeductions)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', borderTop: '2px solid var(--color-text)', paddingTop: '0.5rem', fontSize: '1.1rem' }}>
                    <strong>Renta Líquida Gravable</strong>
                    <strong>{formatCurrency(results.taxableBase)}</strong>
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button className="btn btn-primary" onClick={() => window.print()}>
                    Imprimir / Guardar PDF
                </button>
                <button className="btn btn-outline" onClick={onReset} style={{ border: '2px solid var(--color-primary)', color: 'var(--color-primary)', background: 'transparent' }}>
                    Nuevo Cálculo
                </button>
            </div>
        </div>
    );
}
