import { Spectator, createComponentFactory, mockProvider  } from "@ngneat/spectator/jest";
import { ChatComponent } from "./chat.component";
import { AuthService } from "@auth0/auth0-angular";
import { ApiService } from '@chatwidget/api';
import { Observable, of } from "rxjs";
import { ChannelService, ChatClientService, StreamI18nService, StreamChatModule, DefaultStreamChatGenerics } from 'stream-chat-angular';
import { Channel } from "stream-chat";
import { AuthComponent } from "@chatwidget/auth";

describe(ChatComponent, () => {
  let spectator: Spectator<ChatComponent>;
  let component: ChatComponent;

  const mockChannel = {
    id: 'channel-id',
    type: 'channel-type',
    cid: 'messaging:channel-id',
    data: {},
    state: {
      messages: [],
      members: {},
      mutedUsers: [],
      watchers: {},
      read: {},
      typing: {},
      pinnedMessages: [],
      pending_messages: [],
      watcher_count: 0,
      unreadCount: 0,
      last_message_at: null,
    } 
  };

  const mockChannelService: Partial<ChannelService<DefaultStreamChatGenerics>> = {
    get channels$(): Observable<Channel<DefaultStreamChatGenerics>[]> {
      return of([mockChannel]  as unknown as Channel<DefaultStreamChatGenerics>[]);
  }};

  const createComponent = createComponentFactory({
      component: ChatComponent,
      imports: [
        StreamChatModule
      ],
      declareComponent:false,
      providers: 
      [
        mockProvider(ApiService, {
          getToken: jest.fn(() => of({username: 'test', token: 'token'})),
        }),
        mockProvider(AuthService),
        mockProvider(ChatClientService, {
          init: jest.fn().mockReturnValue(of(null)),
        }),
        mockProvider(ChannelService, mockChannelService),
        mockProvider(StreamI18nService, {
          setTranslation: jest.fn()
        }),
      ],
      mocks: [AuthComponent]
  });

  beforeEach(async () => {
      spectator = createComponent();
      component = spectator.component;
  });

  afterEach(() => {
      jest.clearAllMocks();
  });

  test('Should create', () => {
      expect(component).toBeDefined();
  });

  // test('Should initialize chat service and set translation on init', () => {
  //   const chatService = spectator.inject(ChatClientService);
  //   const streamI18nService = spectator.inject(StreamI18nService);

  //   component.ngOnInit();

  //   expect(chatService.init).toHaveBeenCalledWith('63bygjq8kbu4', 'test', 'token');
  //   expect(streamI18nService.setTranslation).toHaveBeenCalled();
  // });

  // test('Should initialize channel service on init', () => {
  //   const channelService = spectator.inject(ChannelService);

  //   component.ngOnInit();

  //   expect(channelService.init).toHaveBeenCalledWith({
  //     type: 'messaging',
  //     members: {$in: ['test']} 
  //   });
  // });

  // test('Should show declare button if active channel is a consult channel', () => {
  //   component.showDeclare();

  //   expect(component.showDeclareButton).toBe(true);
  // });

  // test('Should update consultButtonText if there are consult channels with no messages', () => {
  //   component.showConsults();

  //   expect(component.consultButtonText).toBe('1');
  // });
});