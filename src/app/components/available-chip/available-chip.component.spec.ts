import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableChipComponent } from './available-chip.component';

describe('AvailableChipComponent', () => {
  let component: AvailableChipComponent;
  let fixture: ComponentFixture<AvailableChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
