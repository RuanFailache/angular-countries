import { TestBed } from "@angular/core/testing";

import { Nullable } from "~/utils/type.utils";

import { Theme, ThemeService, ThemeType } from "./theme.service";

describe("ThemeService", () => {
	let service: ThemeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ThemeService);
	});

	it("should init with light mode activated", () => {
		service.getTheme().subscribe((theme) => {
			expect(theme).toBe(Theme.LIGHT);
		});
	});

	it("should change the mode on toggle correctly", () => {
		let currentTheme: Nullable<ThemeType>;

		service.getTheme().subscribe((theme) => {
			currentTheme = theme;
		});

		service.toggleTheme();

		expect(currentTheme).toBe(Theme.DARK);
	});
});
