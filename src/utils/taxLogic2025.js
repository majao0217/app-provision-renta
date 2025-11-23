// Tax Logic for Colombia - Tax Year 2025
// UVT 2025: $49.799

export const TAX_CONSTANTS = {
  UVT_2025: 49799,
  LIMIT_RENTAS_EXENTAS_PCT: 0.40, // 40% limit
  LIMIT_RENTAS_EXENTAS_UVT: 1340, // Annual limit in UVT for 2025
  DEPENDENTS_DEDUCTION_PCT: 0.10,
  DEPENDENTS_LIMIT_UVT: 384, // 32 UVT * 12 months
  DEPENDENTS_ADDITIONAL_UVT: 72, // Per dependent
  MAX_DEPENDENTS_ADDITIONAL: 4,
  HOUSING_INTEREST_LIMIT_UVT: 1200,
  PREPAID_MEDICINE_LIMIT_UVT: 192,
  EXEMPT_25_LIMIT_UVT: 790,
};

// Helper to parse numbers safely
const parse = (val) => Number(val) || 0;

export const calculateTaxProvision = (incomeData, deductionsData) => {
  const {
    UVT_2025,
    LIMIT_RENTAS_EXENTAS_PCT,
    LIMIT_RENTAS_EXENTAS_UVT,
    DEPENDENTS_DEDUCTION_PCT,
    DEPENDENTS_LIMIT_UVT,
    DEPENDENTS_ADDITIONAL_UVT,
    MAX_DEPENDENTS_ADDITIONAL,
    HOUSING_INTEREST_LIMIT_UVT,
    PREPAID_MEDICINE_LIMIT_UVT,
    EXEMPT_25_LIMIT_UVT
  } = TAX_CONSTANTS;

  // 1. Calculate Gross Income, Costs, and Social Security
  let totalGrossIncome = 0;
  let totalCosts = 0;
  let totalINCR = 0;
  let laborIncomeGross = 0; // Base for 10% dependents deduction
  let laborIncomeNetFor25 = 0; // Base for 25% exempt income
  let hasFormalContract = false;

  // Breakdown object
  const breakdown = {
    grossIncome: 0,
    costs: 0,
    incr: 0,
    deductions: {
      housingInterest: 0,
      prepaidMedicine: 0,
      dependentsStandard: 0,
      dependentsAdditional: 0,
      gmf: 0
    },
    exemptions: {
      voluntaryContributions: 0,
      exempt25: 0
    },
    limits: {
      limit40: 0,
      limitUVT: 0,
      globalLimit: 0
    },
    tax: {
      taxLiability: 0,
      withholdings: 0,
      advance: 0,
      totalPayable: 0
    }
  };

  // Helper to process SS from any section
  const processSS = (data) => {
    return parse(data.salud) + parse(data.pension) + parse(data.arl);
  };

  // Rentas Laborales - Asalariado
  if (incomeData.rentas_laborales_asalariado) {
    const data = incomeData.rentas_laborales_asalariado;
    const gross = parse(data.ingresosBrutos);
    const ss = processSS(data);

    totalGrossIncome += gross;
    totalINCR += ss;
    laborIncomeGross += gross;

    // Asalariado implies formal contract
    hasFormalContract = true;

    // Always eligible for 25% exempt (on the net part)
    laborIncomeNetFor25 += (gross - ss);
  }

  // Rentas Laborales - Independiente
  if (incomeData.rentas_laborales_independiente) {
    const data = incomeData.rentas_laborales_independiente;
    const gross = parse(data.ingresosBrutos);
    const ss = processSS(data);

    totalGrossIncome += gross;
    totalINCR += ss;
    laborIncomeGross += gross;

    if (data.deductionType === 'costs') {
      const costs = parse(data.costosGastos);
      totalCosts += costs;
      // If costs are deducted, 25% exempt income DOES NOT apply to this portion
    } else {
      // 25% exempt applies
      laborIncomeNetFor25 += (gross - ss);
    }
  }

  // Capital
  if (incomeData.rentas_capital) {
    const data = incomeData.rentas_capital;
    const gross = parse(data.ingresosBrutos);
    const costs = parse(data.costosGastos);
    const ss = processSS(data);

    totalGrossIncome += gross;
    totalCosts += costs;
    totalINCR += ss;
  }

  // No Laborales
  if (incomeData.rentas_no_laborales) {
    const data = incomeData.rentas_no_laborales;
    const gross = parse(data.ingresosBrutos);
    const costs = parse(data.costosGastos);
    const ss = processSS(data);

    totalGrossIncome += gross;
    totalCosts += costs;
    totalINCR += ss;
  }

  // Net Income (Ingreso Neto)
  const netIncome = totalGrossIncome - totalCosts - totalINCR;

  // 3. Deductions & Exemptions

  // Dependents Logic
  const numDependents = parse(deductionsData.numberOfDependents);
  let dependentsStandard = 0;
  let dependentsAdditional = 0;

  if (numDependents > 0) {
    // 1. Standard 10% Deduction (Art 387) - Subject to 40% limit
    dependentsStandard = Math.min(laborIncomeGross * DEPENDENTS_DEDUCTION_PCT, DEPENDENTS_LIMIT_UVT * UVT_2025);

    // 2. Additional 72 UVT Deduction (New Law) - NOT subject to 40% limit (Art 336-1 ET)
    if (hasFormalContract) {
      dependentsAdditional = Math.min(numDependents, MAX_DEPENDENTS_ADDITIONAL) * DEPENDENTS_ADDITIONAL_UVT * UVT_2025;
    }
  }

  const housingInterest = Math.min(parse(deductionsData.interesesVivienda), HOUSING_INTEREST_LIMIT_UVT * UVT_2025);
  const prepaidMedicine = Math.min(parse(deductionsData.medicinaPrepagada), PREPAID_MEDICINE_LIMIT_UVT * UVT_2025);

  // Deductions subject to limit
  const deductionsSubjectToLimit = housingInterest + prepaidMedicine + dependentsStandard;

  // Fill breakdown
  breakdown.deductions.housingInterest = housingInterest;
  breakdown.deductions.prepaidMedicine = prepaidMedicine;
  breakdown.deductions.dependentsStandard = dependentsStandard;
  breakdown.deductions.dependentsAdditional = dependentsAdditional;

  // Exemptions
  const voluntaryContributions = parse(deductionsData.aportesVoluntarios); // AFC + Vol Pension
  breakdown.exemptions.voluntaryContributions = voluntaryContributions;

  // 25% Exempt Labor Income
  let exempt25 = 0;
  if (laborIncomeNetFor25 > 0) {
    // Base = Net Income - Deductions (Subject to Limit) - Voluntary Contributions
    const baseFor25 = Math.max(0, netIncome - deductionsSubjectToLimit - voluntaryContributions);
    exempt25 = Math.min(baseFor25 * 0.25, EXEMPT_25_LIMIT_UVT * UVT_2025);
  }
  breakdown.exemptions.exempt25 = exempt25;

  const exemptionsSubjectToLimit = voluntaryContributions + exempt25;

  // Total Benefits Subject to 40% Limit
  const totalBenefitsSubjectToLimit = deductionsSubjectToLimit + exemptionsSubjectToLimit;

  // 4. Apply 40% Limit
  const limit40 = netIncome * LIMIT_RENTAS_EXENTAS_PCT;
  const limitUVT = LIMIT_RENTAS_EXENTAS_UVT * UVT_2025;
  const globalLimit = Math.min(limit40, limitUVT);

  breakdown.limits.limit40 = limit40;
  breakdown.limits.limitUVT = limitUVT;
  breakdown.limits.globalLimit = globalLimit;

  // Benefits after limit
  const benefitsAfterLimit = Math.min(totalBenefitsSubjectToLimit, globalLimit);

  // Final Total Deductions (Add back the unlimited ones)
  const finalTotalDeductions = benefitsAfterLimit + dependentsAdditional;

  // 5. Taxable Base (Renta Líquida Gravable)
  const taxableBase = Math.max(0, netIncome - finalTotalDeductions);
  const taxableBaseUVT = taxableBase / UVT_2025;

  // 6. Calculate Tax (Tarifa General - Art 241 ET)
  let taxUVT = 0;

  if (taxableBaseUVT <= 1090) {
    taxUVT = 0;
  } else if (taxableBaseUVT <= 1700) {
    taxUVT = (taxableBaseUVT - 1090) * 0.19;
  } else if (taxableBaseUVT <= 4100) {
    taxUVT = (taxableBaseUVT - 1700) * 0.28 + 116;
  } else if (taxableBaseUVT <= 8670) {
    taxUVT = (taxableBaseUVT - 4100) * 0.33 + 788;
  } else if (taxableBaseUVT <= 18970) {
    taxUVT = (taxableBaseUVT - 8670) * 0.35 + 2296;
  } else if (taxableBaseUVT <= 31000) {
    taxUVT = (taxableBaseUVT - 18970) * 0.37 + 5901;
  } else {
    taxUVT = (taxableBaseUVT - 31000) * 0.39 + 10352;
  }

  const taxLiability = taxUVT * UVT_2025;

  // 7. Advance Calculation (Anticipo)
  const withholdings = parse(deductionsData.retenciones);
  const declarationCount = parse(deductionsData.declarationCount);

  let advancePercentage = 0.25; // Default 1st time
  if (declarationCount === 1) advancePercentage = 0.50;
  if (declarationCount >= 2) advancePercentage = 0.75;

  // Procedure 1: (Tax Liability * %) - Withholdings
  let advance = (taxLiability * advancePercentage) - withholdings;
  if (advance < 0) advance = 0;

  // 8. Total Payable
  const totalPayable = taxLiability - withholdings + advance;

  // Fill breakdown
  breakdown.tax.taxLiability = taxLiability;
  breakdown.tax.withholdings = withholdings;
  breakdown.tax.advance = advance;
  breakdown.tax.totalPayable = totalPayable;

  breakdown.grossIncome = totalGrossIncome;
  breakdown.costs = totalCosts;
  breakdown.incr = totalINCR;

  return {
    grossIncome: totalGrossIncome,
    costs: totalCosts,
    netIncome,
    totalDeductions: finalTotalDeductions,
    taxableBase,
    taxableBaseUVT,
    taxLiability,
    breakdown // Return the detailed breakdown
  };
};
