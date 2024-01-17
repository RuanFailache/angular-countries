import { Component, Input, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { ThemeService, ThemeType } from "~/services/theme/theme.service";
import { ValueOf } from "~/utils/type.utils";

export const ButtonColor = {
	PRIMARY: "primary",
	SURFACE: "surface",
} as const;

export type ButtonColorType = ValueOf<typeof ButtonColor>;

@Component({
	selector: "app-button",
	standalone: true,
	imports: [MatIconModule],
	templateUrl: "./button.component.html",
	styleUrl: "./button.component.scss",
})
export class ButtonComponent implements OnInit {
	@Input() icon: string;
	@Input() color: ButtonColorType = ButtonColor.SURFACE;

	theme: ThemeType;

	constructor(private themeService: ThemeService) {}

	ngOnInit() {
		this.themeService.getTheme().subscribe((currentTheme) => {
			this.theme = currentTheme;
		});
	}
}
