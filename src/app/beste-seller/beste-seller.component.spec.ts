import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BesteSellerComponent } from './beste-seller.component';

describe('BesteSellerComponent', () => {
  let component: BesteSellerComponent;
  let fixture: ComponentFixture<BesteSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BesteSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BesteSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
