import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchTextFieldComponent } from "./search-text-field.component";

describe("SearchTextFieldComponent", () => {
	let component: SearchTextFieldComponent;
	let fixture: ComponentFixture<SearchTextFieldComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SearchTextFieldComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SearchTextFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
