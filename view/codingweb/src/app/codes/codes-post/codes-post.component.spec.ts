import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodesPostComponent } from './codes-post.component';

describe('CodesPostComponent', () => {
  let component: CodesPostComponent;
  let fixture: ComponentFixture<CodesPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodesPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodesPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
