import { Component, OnInit } from "@angular/core";
import { ApiService } from '@chatwidget/api';
import { ChannelService, ChatClientService, StreamChatModule, StreamI18nService } from 'stream-chat-angular';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SimplebarAngularModule } from 'simplebar-angular';
import { AuthComponent } from '@chatwidget/auth';

@Component({
  selector: 'chatwidget-chat',
  standalone: true,
  imports: [CommonModule, StreamChatModule, SimplebarAngularModule, AuthComponent ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  apiKey = '63bygjq8kbu4';

  showAddButton = false;
  showDeclareButton = false;
  showConsultButton = false;

  consultButtonText = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
  ) {
    this.showAddButton = this.isRouteAvailable('add-channel');
    this.showConsultButton = this.isRouteAvailable('consult');
   }
   
  ngOnInit() {
    if (this.auth.isAuthenticated$) {
      let username = "";

      this.api.getToken().subscribe(response => {
        // console.log(response);
        const token = response.token;
        username = response.username;
        console.log(username);
        // console.log('Token: ', token);

        // Initialize chat service and set translation
        this.chatService.init(this.apiKey, username, token);
        this.streamI18nService.setTranslation();

        // Get all channels the user is in
        this.channelService.init({
          type: 'messaging',
          members: {$in: [username]} 
        });
        
        // Get active channel and check if it is a consult channel
        this.channelService.activeChannel$.subscribe(channel => {
          if (channel?.data) {
            console.log(channel.data);  
            const channelType = channel.data['channel-type'];
            if (channelType === 'consult') {
              this.showDeclareButton = true;
              // console.log(channelType);
            } else {
              this.showDeclareButton = false;
            }
          }
        });

        this.channelService.channels$.subscribe(channels => {
          if (channels) {
            const emptyChannels = channels.filter(channel => channel.state.last_message_at === null);
            this.consultButtonText = emptyChannels.length.toString();
            // console.log(`Number of channels with no messages: ${emptyChannels.length}`);
          }
        });
      });
    }
  }

  addChannel() {
    this.router.navigateByUrl('/add-channel');
  }

  consults() {
    this.router.navigateByUrl('/add-channel');
  }

  declareConsult() {
    window.alert('Consult declared.');
  }

  isRouteAvailable(path: string): boolean {
    return this.router.config.some(route => route.path === path);
  }

}
