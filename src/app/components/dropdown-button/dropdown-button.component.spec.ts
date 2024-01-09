import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DropdownButtonComponent } from "./dropdown-button.component";

describe("DropdownButtonComponent", () => {
	let component: DropdownButtonComponent<string>;
	let fixture: ComponentFixture<DropdownButtonComponent<string>>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DropdownButtonComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DropdownButtonComponent<string>);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
