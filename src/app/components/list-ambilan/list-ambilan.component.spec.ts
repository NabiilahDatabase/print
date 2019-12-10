import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAmbilanComponent } from './list-ambilan.component';

describe('ListAmbilanComponent', () => {
  let component: ListAmbilanComponent;
  let fixture: ComponentFixture<ListAmbilanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAmbilanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAmbilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
