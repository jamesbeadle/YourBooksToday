import type { HomeWorkingBand, TaxYearName } from './taxYearRules';

export type TradingStatus = 'soleTrader' | 'cisSubcontractor';

export type VehicleType = 'none' | 'carOrVan' | 'motorcycle' | 'bicycle';

export type TaxEstimateInputs = {
	taxYear: TaxYearName;
	tradingStatus: TradingStatus;
	annualIncome: number;
	annualExpenses: number;
	annualCisDeductions: number;
	annualBusinessMiles: number;
	vehicleType: VehicleType;
	homeWorkingBand: HomeWorkingBand;
};
