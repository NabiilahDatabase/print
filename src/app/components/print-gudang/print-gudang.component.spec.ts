import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintGudangComponent } from './print-gudang.component';

describe('PrintGudangComponent', () => {
  let component: PrintGudangComponent;
  let fixture: ComponentFixture<PrintGudangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintGudangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintGudangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
