import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistIndexComponent } from './playlist-index.component';

describe('PlaylistIndexComponent', () => {
  let component: PlaylistIndexComponent;
  let fixture: ComponentFixture<PlaylistIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
