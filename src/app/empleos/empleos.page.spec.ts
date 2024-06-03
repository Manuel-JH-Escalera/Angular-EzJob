import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleosPage } from './empleos.page';

describe('EmpleosPage', () => {
  let component: EmpleosPage;
  let fixture: ComponentFixture<EmpleosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
