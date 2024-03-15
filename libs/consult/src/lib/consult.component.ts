import { Component, OnInit } from "@angular/core";
import { ApiService } from '@chatwidget/api';
import { ChannelService, ChatClientService, DefaultStreamChatGenerics, StreamChatModule, StreamI18nService } from 'stream-chat-angular';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import { AuthComponent } from '@chatwidget/auth';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Channel } from "stream-chat";

@Component({
  selector: 'chatwidget-chat',
  standalone: true,
  imports: [CommonModule, StreamChatModule, SimplebarAngularModule, AuthComponent ],
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {
  // channels: string[] = [];
  channels: Channel<DefaultStreamChatGenerics>[] = [];

  constructor(
    private api: ApiService,
    private channelService: ChannelService,
    private location: Location,
    private router: Router,
  ) { }
   
  ngOnInit() {
    this.channelService.channels$.subscribe(channels => {
      if (channels) {
        const emptyChannels = channels.filter(channel => 
          channel.state.last_message_at === null 
          && channel.data 
          && channel.data['channel-type'] === 'consult');
        this.channels = emptyChannels;
        // console.log(this.channels);
      }
    });
  }

  goToChat(channel: Channel<DefaultStreamChatGenerics>): void {
    this.channelService.setAsActiveChannel(channel);
    this.router.navigate(['/chat']);
  }

  // goToChat(channelId: string): void {
  //   let selectedChannel;
  //   this.channelService.channels$.subscribe(channels => {
  //     if (channels) {
  //       selectedChannel = channels.find(channel => channel.data?.id === channelId);
  //       if (selectedChannel) {
  //         this.channelService.setAsActiveChannel(selectedChannel);
  //       }
  //     }
  //   });
  //   this.router.navigate(['/chat']);
  // }

  getFirstChar(id: any): string {
    return typeof id === 'string' ? id.charAt(0) : '';
  }

  return() {
    this.location.back();
  }
}
