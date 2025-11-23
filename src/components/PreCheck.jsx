import React, { useState } from 'react';
import './PreCheck.css';

const PreCheck = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        isResident: null, // true, false, or null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleResidencyChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            isResident: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.isResident === true && formData.name && formData.email) {
            onComplete(formData);
        }
    };

    return (
        <div className="pre-check-container">
            <h2>Bienvenido al Calculador de Renta 2025</h2>
            <p className="subtitle">Para comenzar, necesitamos validar tu residencia fiscal.</p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre Completo</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@email.com"
                    />
                </div>

                <div className="form-group residency-question">
                    <p>¿Has permanecido en Colombia por más de 183 días (continuos o discontinuos) durante un periodo de 365 días consecutivos?</p>
                    <div className="radio-group">
                        <label className={`radio-option ${formData.isResident === true ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="isResident"
                                value="yes"
                                checked={formData.isResident === true}
                                onChange={() => handleResidencyChange(true)}
                            />
                            Sí
                        </label>
                        <label className={`radio-option ${formData.isResident === false ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="isResident"
                                value="no"
                                checked={formData.isResident === false}
                                onChange={() => handleResidencyChange(false)}
                            />
                            No
                        </label>
                    </div>
                    {formData.isResident === false && (
                        <div className="error-message">
                            Lo sentimos. Esta herramienta está diseñada solo para residentes fiscales en Colombia. Te recomendamos consultar con un contador experto.
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={formData.isResident !== true}
                >
                    Continuar
                </button>
            </form>
        </div>
    );
};

export default PreCheck;
