import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Country } from "~/models/Country";

@Injectable({
	providedIn: "root",
})
export class CountryService {
	private baseUrl = "https://restcountries.com/v3.1/";

	constructor(private httpClient: HttpClient) {}

	getAllCountries(): Observable<Country[]> {
		return this.httpClient.get<Country[]>(`${this.baseUrl}/all`);
	}
}
