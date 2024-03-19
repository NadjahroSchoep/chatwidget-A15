import { Spectator, createComponentFactory, mockProvider } from "@ngneat/spectator";
import { ConsultComponent } from "./consult.component";
import { AuthService } from "@auth0/auth0-angular";
import { ApiService } from '@chatwidget/api';
import { of } from "rxjs";
import { ChannelService, ChatClientService, DefaultStreamChatGenerics, StreamI18nService } from 'stream-chat-angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Channel } from "stream-chat";

describe('ConsultComponent', () => {
  let spectator: Spectator<ConsultComponent>;
  const createComponent = createComponentFactory({
    component: ConsultComponent,
    providers: [
      mockProvider(ApiService),
      mockProvider(AuthService),
      mockProvider(Location),
      mockProvider(ChatClientService),
      mockProvider(ChannelService, {
        channels$: of([]), // Mock the channels$ observable
      }),
      mockProvider(StreamI18nService),
      mockProvider(Router, {
        navigate: jest.fn(),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  // it('should navigate to chat on goToChat', () => {
  //   const channel: Partial<Channel<DefaultStreamChatGenerics>> = {
  //     id: 'channel-id',
  //     type: 'channel-type',
  //     data: {},
  //     state: {
  //       _channel: null,
  //       mutedUsers: [],
  //       watchers: {},
  //       // Add other required properties from ChannelState<DefaultStreamChatGenerics> type
  //       typing: {},
  //       pinnedMessages: [],
  //       pending_messages: [],
  //       watcher_count: 0,
  //       read: {},
  //       last_message_at: null,
  //     },
  //     // Add other properties as needed
  //   };
  //   spectator.component.goToChat(channel);
  //   expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['/chat']);
  // });

  it('should navigate back on return', () => {
    spectator.component.return();
    expect(spectator.inject(Location).back).toHaveBeenCalled();
  });
});