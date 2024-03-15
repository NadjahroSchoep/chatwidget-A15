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
      mockProvider(ChannelService),
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

  it('should filter channels on init', () => {
    spectator.detectChanges();
    expect(spectator.component.channels.length).toBe(1);
  });

  it('should set active channel and navigate on goToChat', () => {
    const channel = { id: 'test', _client: {}, type: '', data: {}, _data: {} } as Channel<DefaultStreamChatGenerics>;
    spectator.component.goToChat(channel);
    expect(spectator.inject(ChannelService).setAsActiveChannel).toHaveBeenCalledWith(channel);
    expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['/chat']);
  });

  it('should return first character of string', () => {
    expect(spectator.component.getFirstChar('test')).toBe('t');
  });

  it('should navigate back on return', () => {
    spectator.component.return();
    expect(spectator.inject(Location).back).toHaveBeenCalled();
  });
});