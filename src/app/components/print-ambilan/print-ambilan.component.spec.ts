import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAmbilanComponent } from './print-ambilan.component';

describe('PrintAmbilanComponent', () => {
  let component: PrintAmbilanComponent;
  let fixture: ComponentFixture<PrintAmbilanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintAmbilanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintAmbilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
