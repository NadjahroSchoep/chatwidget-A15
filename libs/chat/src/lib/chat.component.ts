import { Component, OnInit } from '@angular/core';
import { ApiService } from '@chatwidget/api';
import { ChannelService, ChatClientService, StreamChatModule, StreamI18nService } from 'stream-chat-angular';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'chatwidget-chat',
  standalone: true,
  imports: [CommonModule, StreamChatModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
  ) {}

  addChannel() {
    this.router.navigateByUrl('/add-channel');
  }

  ngOnInit() {
    const apiKey = '63bygjq8kbu4';

    if (this.auth.isAuthenticated$) {

      let username = "";
    
      this.api.getToken().subscribe(response => {
      // console.log(response);
      const token = response.token;
      username = response.username;
      console.log(username);
      // console.log('Token: ', token);

      // this.api.addUser(name);
      // this.api.addUser('test3');

      // Initialize chat service and set translation
      this.chatService.init(apiKey, username, token);
      this.streamI18nService.setTranslation();

      // Initialize channel
      // const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
      //   image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      //   name: 'Talking about Angular',
      // });

      // channel.create();
      this.channelService.init({
        type: 'messaging',
        members: {$in: [username]} 
      });
    });
  
    // this.api.getUserChannels(username).subscribe(response => {
    //   console.log(response);

    //   response.channels.forEach((channel: any) => {
    //       const id: string = channel.channel.id;

    //       this.channelService.init({
    //         type: 'messaging',
    //         id: { $eq: id },
    //       })

    //       console.log(id);
    //   });
    // });
    }
  }
}
