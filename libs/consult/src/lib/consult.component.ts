import { Component, OnInit } from "@angular/core";
import { ApiService } from '@chatwidget/api';
import { ChannelService, ChatClientService, StreamChatModule, StreamI18nService } from 'stream-chat-angular';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import { AuthComponent } from '@chatwidget/auth';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'chatwidget-chat',
  standalone: true,
  imports: [CommonModule, StreamChatModule, SimplebarAngularModule, AuthComponent ],
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {
  channels: string[] = [];

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private location: Location,
    private router: Router,
    private streamI18nService: StreamI18nService,
  ) { }
   
  ngOnInit() {
    this.channelService.channels$.subscribe(channels => {
      if (channels) {
        const emptyChannels = channels.filter(channel => channel.state.last_message_at === null);
        this.channels = emptyChannels.map(channel => (channel.data?.id as string).toString());
        // console.log(`Number of channels with no messages: ${emptyChannels.length}`);
        console.log(emptyChannels);
      }
    });
  }

  goToChat(channelId: string): void {
    let selectedChannel;
    this.channelService.channels$.subscribe(channels => {
      if (channels) {
        selectedChannel = channels.find(channel => channel.data?.id === channelId);
        if (selectedChannel) {
          this.channelService.setAsActiveChannel(selectedChannel);
        }
      }
    });
    this.router.navigate(['/chat']);
  }

  return() {
    this.location.back();
  }
}
