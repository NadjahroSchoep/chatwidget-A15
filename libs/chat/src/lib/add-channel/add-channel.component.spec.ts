import { Spectator, createComponentFactory, mockProvider } from "@ngneat/spectator/jest";
import { AddChannelComponent } from "./add-channel.component";
import { AuthService } from "@auth0/auth0-angular";
import { ApiService } from '@chatwidget/api';
import { of } from "rxjs";
import { waitForAsync } from "@angular/core/testing";

describe(AddChannelComponent, () => {
  let spectator: Spectator<AddChannelComponent>;
  let component: AddChannelComponent;

  const createComponent = createComponentFactory({
      component: AddChannelComponent,
      declareComponent:false,
      providers: 
      [
        mockProvider(ApiService, {
          getToken: jest.fn(() => of({username: 'test'})),
          getUsers: jest.fn(() => of({users: [{id: 'test'}]}))
        }),
        mockProvider(AuthService, {
          isAuthenticated$: of(true),
        }),
        mockProvider(Location)
      ]
    
  });

  beforeEach(() => {
      spectator = createComponent();
      component = spectator.component;
  });

  afterEach(() => {
      jest.clearAllMocks();
  });

  test('Should create', () => {
      expect(component).toBeDefined();
  });

  test('should get the current username', waitForAsync(() => {
    expect(component.username).toBe('test');
  } ));

  
});