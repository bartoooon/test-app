import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalContentComponent } from './delete-modal-content.component';

describe('DeleteModalContentComponent', () => {
  let component: DeleteModalContentComponent;
  let fixture: ComponentFixture<DeleteModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteModalContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
