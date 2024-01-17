import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { ThemeService, ThemeType } from "~/services/theme/theme.service";

@Component({
	selector: "app-search-text-field",
	standalone: true,
	imports: [MatIconModule],
	templateUrl: "./search-text-field.component.html",
	styleUrl: "./search-text-field.component.scss",
})
export class SearchTextFieldComponent implements OnInit {
	@Input() placeholder: string = "";
	@Input({ required: true }) value: string = "";

	@Output() search = new EventEmitter<string>();

	theme: ThemeType;

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.getTheme().subscribe((currentTheme) => {
			this.theme = currentTheme;
		});
	}

	onSearch(target: EventTarget | null) {
		const { value } = target as HTMLInputElement;
		this.search.emit(value);
	}
}
