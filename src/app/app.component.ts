import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { PageHeaderComponent } from "~/components/page-header/page-header.component";

import { ThemeService, ThemeType } from "./services/theme/theme.service";

@Component({
	selector: "app-root",
	standalone: true,
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	imports: [CommonModule, RouterOutlet, PageHeaderComponent],
})
export class AppComponent implements OnInit {
	theme: ThemeType;

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.getTheme().subscribe((theme) => {
			this.theme = theme;
		});
	}
}
