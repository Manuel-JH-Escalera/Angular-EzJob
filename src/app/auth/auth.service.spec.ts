import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when userObject exists in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{"some":"data"}');
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should return false when userObject does not exist in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.isAuthenticated()).toBeFalsy();
  });
});
