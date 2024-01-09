import { Component, Input, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { ThemeService, ThemeType } from "~/services/theme/theme.service";

@Component({
	selector: "app-button",
	standalone: true,
	imports: [MatIconModule],
	templateUrl: "./button.component.html",
	styleUrl: "./button.component.scss",
})
export class ButtonComponent implements OnInit {
	@Input() icon: string;

	theme: ThemeType;

	constructor(private themeService: ThemeService) {}

	ngOnInit() {
		this.themeService.getTheme().subscribe((currentTheme) => {
			this.theme = currentTheme;
		});
	}
}
