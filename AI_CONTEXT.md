# AI Context - Tax Calculator Colombia 2025

## Project Overview
**Name**: Tax Calculator Colombia (Provision Renta)
**Purpose**: A React web application to calculate the income tax provision for natural persons in Colombia for the tax year 2025.
**Target Audience**: Independent professionals, employees, and anyone needing to estimate their 2025 income tax.

## Tech Stack
- **Framework**: React 18+ (Vite)
- **Language**: JavaScript (ES Modules)
- **Styling**: CSS Modules / Vanilla CSS (No Tailwind unless requested)
- **Build Tool**: Vite
- **PDF Generation**: `html2pdf.js`
- **Linting**: ESLint

## Business Logic (Tax Year 2025)
The core logic resides in `src/utils/taxLogic2025.js`.

### Key Constants
- **UVT 2025**: $49,799 COP
- **Exempt Income Limit**: 40% of net income, capped at 1,340 UVT.
- **Dependents Deduction**: 10% of gross labor income (capped at 384 UVT) + 72 UVT per dependent (max 4).
- **Housing Interest Limit**: 1,200 UVT.
- **Prepaid Medicine Limit**: 192 UVT.
- **25% Exempt Income**: Capped at 790 UVT. Applies to Labor Income only.

### Income Categories
1.  **Rentas Laborales (Labor Income)**:
    *   **Asalariado (Employee)**: Automatic 25% exemption.
    *   **Independiente (Independent)**: Can choose between deducting costs/expenses OR taking the 25% exemption (not both).
2.  **Rentas de Capital (Capital Income)**: Interests, financial yields, etc.
3.  **Rentas No Laborales (Non-Labor Income)**: Other income sources.

### Calculation Flow
1.  **Gross Income**: Sum of all income sources.
2.  **Net Income**: Gross Income - Social Security (Health/Pension/ARL) - Costs/Expenses.
3.  **Deductions**: Housing interest, prepaid medicine, dependents.
4.  **Exemptions**: Voluntary contributions, 25% exempt income (labor only).
5.  **Limits**: Apply 40% global limit to deductions + exemptions (capped at 1,340 UVT).
6.  **Taxable Base**: Net Income - Final Deductions.
7.  **Tax Liability**: Calculated using the progressive UVT table (Art 241 ET).
8.  **Total Payable**: Tax Liability - Withholdings (Retenciones) + Advance (Anticipo).

## Project Structure
- `src/`
    - `components/`: UI Components.
        - `DynamicIncomeForm.jsx`: Main input form.
        - `ResultsView.jsx`: Displays calculation results.
        - `CiiuSearch.jsx`: Search tool for economic activities.
    - `data/`: JSON data files (e.g., `ciiu.json`).
    - `utils/`: Helper functions.
        - `taxLogic2025.js`: **CRITICAL**. All tax math is here.
    - `App.jsx`: Main entry point, handles state.

## Conventions
- **Language**:
    - Code variables: Mostly English (e.g., `grossIncome`, `taxLiability`).
    - UI Labels/Business Terms: Spanish (e.g., "Ingresos Brutos", "Renta Líquida").
- **Currency**: All monetary values are in Colombian Pesos (COP).
- **Formatting**: Use `Intl.NumberFormat` for displaying currency.

## Development
- **Run Dev**: `npm run dev`
- **Build**: `npm run build`
