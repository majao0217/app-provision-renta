import React, { useState, useEffect } from 'react';
import './CurrencyInput.css';

const CurrencyInput = ({ value, onChange, placeholder, disabled }) => {
    const [displayValue, setDisplayValue] = useState('');

    // Format number with thousands separator
    const formatNumber = (num) => {
        if (!num && num !== 0) return '';
        return new Intl.NumberFormat('es-CO').format(num);
    };

    // Update display value when prop value changes
    useEffect(() => {
        if (value || value === 0) {
            setDisplayValue(formatNumber(value));
        } else {
            setDisplayValue('');
        }
    }, [value]);

    const handleChange = (e) => {
        const inputValue = e.target.value;

        // Remove all non-numeric characters
        const rawValue = inputValue.replace(/\D/g, '');

        // Update parent with raw number
        onChange(rawValue);

        // Update local display with formatted string
        if (rawValue) {
            setDisplayValue(formatNumber(rawValue));
        } else {
            setDisplayValue('');
        }
    };

    return (
        <input
            type="text"
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            className="currency-input"
        />
    );
};

export default CurrencyInput;
