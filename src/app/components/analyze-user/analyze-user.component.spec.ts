import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeUserComponent } from './analyze-user.component';

describe('AnalyzeUserComponent', () => {
  let component: AnalyzeUserComponent;
  let fixture: ComponentFixture<AnalyzeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
