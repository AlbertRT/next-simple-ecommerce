const CURRENCY_FORMATER = new Intl.NumberFormat("id-ID", {
	currency: "IDR",
	style: "currency",
	minimumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
	return CURRENCY_FORMATER.format(amount);
}

const NUMBER_FORMATER = new Intl.NumberFormat("id-ID");

export function formatNumber(number: number): string {
	return NUMBER_FORMATER.format(number);
}
