import { NgOptimizedImage } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

import { ThemeService, ThemeType } from "~/services/theme/theme.service";

interface DataCell {
	label: string;
	value: string;
}

@Component({
	selector: "app-country-card",
	standalone: true,
	imports: [NgOptimizedImage],
	templateUrl: "./country-card.component.html",
	styleUrl: "./country-card.component.scss",
})
export class CountryCardComponent implements OnInit {
	@Input({ required: true }) title: string;
	@Input({ required: true }) flagSource: string;
	@Input({ required: true }) data: DataCell[];

	theme: ThemeType;

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.getTheme().subscribe((currentTheme) => {
			this.theme = currentTheme;
		});
	}
}
