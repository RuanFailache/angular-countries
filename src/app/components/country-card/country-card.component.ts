import { NgOptimizedImage } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

import { CountryCardInput } from "~/components/country-card/country-card.types";
import { ThemeService, ThemeType } from "~/services/theme/theme.service";

@Component({
	selector: "app-country-card",
	standalone: true,
	imports: [NgOptimizedImage],
	templateUrl: "./country-card.component.html",
	styleUrl: "./country-card.component.scss",
})
export class CountryCardComponent implements OnInit {
	@Input({ required: true }) card: CountryCardInput;

	theme: ThemeType;

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.getTheme().subscribe((currentTheme) => {
			this.theme = currentTheme;
		});
	}
}
