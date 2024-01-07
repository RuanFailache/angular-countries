export interface DataCell {
	label: string;
	value: string;
}

export interface CountryCardInput {
	title: string;
	flagSource: string;
	data: DataCell[];
}
