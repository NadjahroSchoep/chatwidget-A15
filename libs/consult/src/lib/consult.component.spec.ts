import { Spectator, createComponentFactory, mockProvider } from "@ngneat/spectator/jest";
import { ConsultComponent } from "./consult.component";
import { AuthService } from "@auth0/auth0-angular";
import { ApiService } from '@chatwidget/api';
import { Observable, of } from "rxjs";
import { ChannelService, ChatClientService, DefaultStreamChatGenerics, StreamI18nService } from 'stream-chat-angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Channel } from "stream-chat";

describe('ConsultComponent', () => {
  let spectator: Spectator<ConsultComponent>;
  let component: ConsultComponent;

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
    component: ConsultComponent,
    declareComponent:false,
    providers: [
      mockProvider(ApiService),
      mockProvider(AuthService),
      mockProvider(Location),
      mockProvider(ChatClientService),
      mockProvider(ChannelService, mockChannelService),
      mockProvider(StreamI18nService),
      mockProvider(Router, {
        navigate: jest.fn(),
      }),
    ],
  });

  beforeEach(() => {
    // a.mockImplementation(() => channels$.asObservable); // Mock the channels$ observable
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to chat on goToChat', () => {
    component.ngOnInit();
    spectator.component.goToChat(component.channels[0]);
    expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['/chat']);
  });

  it('should navigate back on return', () => {
    component.return();
    expect(spectator.inject(Location).back).toHaveBeenCalled();
  });
});