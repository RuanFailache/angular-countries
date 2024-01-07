interface Flag {
	png: string;
	svg: string;
}

interface CountryName {
	common: string;
	official: string;
}

export interface Country {
	capital: string[];
	flags: Flag;
	name: CountryName;
	population: number;
	region: string;
}
