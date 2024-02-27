import { Spectator, createComponentFactory, mockProvider } from "@ngneat/spectator/jest";
import { ChatComponent } from "./chat.component";
import { AuthService } from "@auth0/auth0-angular";
import { ApiService } from '@chatwidget/api';
import { of } from "rxjs";
import { waitForAsync } from "@angular/core/testing";

describe(ChatComponent, () => {
  let spectator: Spectator<ChatComponent>;
  let component: ChatComponent;

  const createComponent = createComponentFactory({
      component: ChatComponent,
      declareComponent:false,
      providers: 
      [
        mockProvider(ApiService, {
          getToken: jest.fn(() => of({username: 'test'})),
          getUsers: jest.fn(() => of({
            users: [
              {id: 'test'},
              {id: 'test2'},
              {id: 'test3'},
              {id: 'test4'},
              {id: 'test5'}
            ]
          }))
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

  
});