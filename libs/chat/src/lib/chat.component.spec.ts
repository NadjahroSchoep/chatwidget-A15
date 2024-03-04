import { Spectator, createComponentFactory, mockProvider } from "@ngneat/spectator/jest";
import { ChatComponent } from "./chat.component";
import { AuthService } from "@auth0/auth0-angular";
import { ApiService } from '@chatwidget/api';
import { of } from "rxjs";
import { waitForAsync } from "@angular/core/testing";
import { ChannelService, ChatClientService, StreamChatModule, StreamI18nService } from 'stream-chat-angular';


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
        }),
        mockProvider(AuthService, {
          isAuthenticated$: of(true),
        }),
        mockProvider(Location),
        mockProvider(ChatClientService),
        mockProvider(ChannelService),
        mockProvider(StreamI18nService)
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

  test('Should initialize chat service and channel service if authenticated', () => {
    // Arrange
    const authService = spectator.inject(AuthService);
    const apiService = spectator.inject(ApiService);
    const getTokenSpy = jest.spyOn(apiService, 'getToken');
    const response = { token: 'token1', username: 'user1' };
    getTokenSpy.mockReturnValue(of(response) as any);
    const chatService = spectator.inject(ChatClientService);
    const initChatServiceSpy = jest.spyOn(chatService, 'init');
    const streamI18nService = spectator.inject(StreamI18nService);
    const setTranslationSpy = jest.spyOn(streamI18nService, 'setTranslation');
    const channelService = spectator.inject(ChannelService);
    const initChannelServiceSpy = jest.spyOn(channelService, 'init');
  
    // Act
    component.ngOnInit();
  
    // Assert
    expect(getTokenSpy).toHaveBeenCalled();
    expect(initChatServiceSpy).toHaveBeenCalledWith(component.apiKey, response.username, response.token);
    expect(setTranslationSpy).toHaveBeenCalled();
    expect(initChannelServiceSpy).toHaveBeenCalledWith({
      type: 'messaging',
      members: { $in: [response.username] }
    });
  });
});