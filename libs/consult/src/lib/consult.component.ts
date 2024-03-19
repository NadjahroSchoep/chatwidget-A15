import { Component, OnInit } from "@angular/core";
import { ApiService } from '@chatwidget/api';
import { ChannelService, DefaultStreamChatGenerics, StreamChatModule } from 'stream-chat-angular';
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
  channels: Channel<DefaultStreamChatGenerics>[] = [];

  constructor(
    private api: ApiService,
    private channelService: ChannelService,
    private location: Location,
    private router: Router,
  ) { }
   
  ngOnInit() {
    // Get the channels from the channel service and filter the empty ones with the channeltype consult
    this.channelService.channels$.subscribe(channels => {
      if (channels) {
        const emptyChannels = channels.filter(channel => 
          channel.state.last_message_at === null 
          && channel.data 
          && channel.data['channel-type'] === 'consult');
        this.channels = emptyChannels;
        console.log(this.channels);
      }
    });
  }

  // Set the channel as active and navigate to the chat
  goToChat(channel: Channel<DefaultStreamChatGenerics>): void {
    this.channelService.setAsActiveChannel(channel);
    this.router.navigate(['/chat']);
  }

  // Get the first character of the id to use as an avatar
  getFirstChar(id: any): string {
    return typeof id === 'string' ? id.charAt(0) : '';
  }

  // Return to the previous page
  return() {
    this.location.back();
  }
}
