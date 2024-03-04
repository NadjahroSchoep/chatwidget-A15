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

  test('Should get the current username', waitForAsync(() => {
    expect(component.username).toBe('test');
  } ));

  test('Should check amount of users', () => {
    expect(component.users).toHaveLength(4);
  });

  test('Should query users and set users property', () => {
    // Arrange
    const apiService = spectator.inject(ApiService);
    const getUsersSpy = jest.spyOn(apiService, 'getUsers');
  
    // Act
    component.queryUsers('test');
  
    // Assert
    expect(getUsersSpy).toHaveBeenCalledWith({ username: 'test' });
    expect(component.users).toEqual(['test', 'test2', 'test3', 'test4', 'test5']);
  });

  test('Should add user to selectedUsers array', () => {
    // Act
    component.addUser('test');
  
    // Assert
    expect(component.selectedUsers).toContain('test');
  });
  
  test('Should remove user from selectedUsers array if already present', () => {
    // Arrange
    component.selectedUsers = ['test'];
  
    // Act
    component.addUser('test');
  
    // Assert
    expect(component.selectedUsers).not.toContain('test');
  });
  
  test('Should create a channel and return', () => {
    // Arrange
    const apiService = spectator.inject(ApiService);
    const createChannelSpy = jest.spyOn(apiService, 'createChannel');
    const response = { channel: { id: 'channel1' } };
    createChannelSpy.mockReturnValue(of(response) as any);
  
    // Act
    component.addChannel();
  
    // Assert
    expect(createChannelSpy).toHaveBeenCalledWith(component.channelName, component.selectedUsers);
  });
});