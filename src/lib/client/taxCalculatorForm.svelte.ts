import { estimateTax, type TaxEstimate } from '$lib/data/taxCalculator/taxEstimate';
import type { TaxEstimateInputs, TradingStatus, VehicleType } from '$lib/data/taxCalculator/taxEstimateInputs';
import { currentTaxYear, type HomeWorkingBand, type TaxYearName } from '$lib/data/taxCalculator/taxYearRules';
import { PeriodAmount, type RememberedPeriodAmount } from './periodAmount.svelte';

export type RememberedTaxCalculatorForm = {
	taxYear: TaxYearName;
	tradingStatus: TradingStatus;
	income: RememberedPeriodAmount;
	expenses: RememberedPeriodAmount;
	cisDeductions: RememberedPeriodAmount;
	businessMiles: RememberedPeriodAmount;
	vehicleType: VehicleType;
	homeWorkingBand: HomeWorkingBand;
};

export class TaxCalculatorForm {
	taxYear = $state<TaxYearName>(currentTaxYear(new Date()));
	tradingStatus = $state<TradingStatus>('soleTrader');
	income = new PeriodAmount();
	expenses = new PeriodAmount();
	cisDeductions = new PeriodAmount();
	businessMiles = new PeriodAmount();
	vehicleType = $state<VehicleType>('none');
	homeWorkingBand = $state<HomeWorkingBand>('under25Hours');

	get isCisSubcontractor(): boolean {
		return this.tradingStatus === 'cisSubcontractor';
	}

	get hasErrors(): boolean {
		const amounts = [this.income, this.expenses, this.cisDeductions, this.businessMiles];
		return amounts.some((periodAmount) => periodAmount.errorMessage !== null);
	}

	get inputs(): TaxEstimateInputs {
		return {
			taxYear: this.taxYear,
			tradingStatus: this.tradingStatus,
			annualIncome: this.income.annualAmount,
			annualExpenses: this.expenses.annualAmount,
			annualCisDeductions: this.isCisSubcontractor ? this.cisDeductions.annualAmount : 0,
			annualBusinessMiles: this.businessMiles.annualAmount,
			vehicleType: this.vehicleType,
			homeWorkingBand: this.homeWorkingBand
		};
	}

	get estimate(): TaxEstimate | null {
		if (!this.income.hasAmount || this.hasErrors) return null;
		return estimateTax(this.inputs);
	}

	remembered(): RememberedTaxCalculatorForm {
		return {
			taxYear: this.taxYear,
			tradingStatus: this.tradingStatus,
			income: this.income.remembered(),
			expenses: this.expenses.remembered(),
			cisDeductions: this.cisDeductions.remembered(),
			businessMiles: this.businessMiles.remembered(),
			vehicleType: this.vehicleType,
			homeWorkingBand: this.homeWorkingBand
		};
	}

	restore(remembered: Partial<RememberedTaxCalculatorForm>): void {
		this.taxYear = remembered.taxYear ?? this.taxYear;
		this.tradingStatus = remembered.tradingStatus ?? this.tradingStatus;
		this.income.restore(remembered.income);
		this.expenses.restore(remembered.expenses);
		this.cisDeductions.restore(remembered.cisDeductions);
		this.businessMiles.restore(remembered.businessMiles);
		this.vehicleType = remembered.vehicleType ?? this.vehicleType;
		this.homeWorkingBand = remembered.homeWorkingBand ?? this.homeWorkingBand;
	}
}
