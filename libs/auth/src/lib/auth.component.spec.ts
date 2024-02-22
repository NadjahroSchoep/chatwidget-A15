import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      isAuthenticated$: of(true),
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    };

    await TestBed.configureTestingModule({
        imports: [AuthComponent],
        providers: [
            { provide: AuthService, useValue: authServiceMock },
        ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define isAuthenticated$', () => {
    expect(component.isAuthenticated$).toBeDefined();
  });

  it('should call loginWithRedirect on login', () => {
    component.login();
    expect(authService.loginWithRedirect).toHaveBeenCalled();
  });

  it('should call logout on logout', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should call loginWithRedirect with signup hint on signup', () => {
    component.signup();
    expect(authService.loginWithRedirect).toHaveBeenCalledWith({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  });
});