import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://localhost:7183';

  beforeEach(async () => {
    const authServiceMock = {
      isAuthenticated$: of(true),
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
          { provide: AuthService, useValue: authServiceMock },
          ApiService
      ],
  }).compileComponents();

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should fetch token', () => {
    const mockResponse = { token: 'test-token' };

    service.getToken().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/stream/token`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse); // Provide dummy values as a response
  });

  // ...similar tests for getUsers, getUserChannels, createChannel...
  it('should get users', () => {
    const mockResponse = { data: 'users data' };
    const options = { username: 'user1', ascending: true };

    service.getUsers(options).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/stream/users?username=${options.username}&ascending=${options.ascending}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should create channel', () => {
    const mockResponse = { data: 'channel data' };
    const channelId = 'channel1';
    const users = ['user1', 'user2'];

    service.createChannel(channelId, users).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/stream/create-channel`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ channelId: channelId, users: users });

    req.flush(mockResponse);
  });

  it('should add user', () => {
    const username = 'user1';
    const admin = false;
    const specialist = true;
    const mockResponse = { data: 'user data' };

    service.addUser(username, admin, specialist).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/stream/create-user?username=${username}&admin=${admin}&specialist=${specialist}`);
    expect(req.request.method).toBe('POST');

    req.flush(mockResponse);
  });
});