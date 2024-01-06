import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Theme } from "~/services/theme/theme.service";

import { PageHeaderComponent } from "./page-header.component";

describe("PageHeaderComponent", () => {
	let component: PageHeaderComponent;
	let fixture: ComponentFixture<PageHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PageHeaderComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PageHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should change the current theme on toggle", () => {
		expect(component.theme).toBe(Theme.LIGHT);
		component.onToggleTheme();
		expect(component.theme).toBe(Theme.DARK);
	});

	it("should display correct button text", () => {
		const textOnLight = component.buttonText;
		expect(textOnLight).toBe("Light Mode");

		component.onToggleTheme();

		const textOnDark = component.buttonText;
		expect(textOnDark).toBe("Dark Mode");
	});

	it("should display correct icon", () => {
		const iconOnLight = component.icon;
		expect(iconOnLight).toBe("light_mode");

		component.onToggleTheme();

		const iconOnDark = component.icon;
		expect(iconOnDark).toBe("dark_mode");
	});
});
