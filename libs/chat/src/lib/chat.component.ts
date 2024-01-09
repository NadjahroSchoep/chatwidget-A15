import { Component, OnInit } from '@angular/core';
import { ApiService } from '@chatwidget/api';
import { ChannelService, ChatClientService, StreamChatModule, StreamI18nService } from 'stream-chat-angular';
import { AuthHttpInterceptor, AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'chatwidget-chat',
  standalone: true,
  imports: [CommonModule, StreamChatModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
  ) {}

  ngOnInit() {
    const apiKey = '63bygjq8kbu4';

    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe(user => {
        if (user && user.name) {
          const name = user.name+'2';

          this.api.getToken(name).subscribe(response => {
            const token = response;
            console.log('Token: ', token);

            this.api.addUser(name);
            this.api.addUser(name + '2');

            // Initialize chat service and set translation
            this.chatService.init(apiKey, name, token);
            this.streamI18nService.setTranslation();

            // Initialize channel
            const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
              image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
              name: 'Talking about Angular',
            });

            channel.create();
            this.channelService.init({
              type: 'messaging',
              id: { $eq: 'talking-about-angular' },
            });
          });

          this.api.getUserChannels(name).subscribe(response => {
            console.log(response);

            response.channels.forEach((channel: any) => {
                const id: string = channel.channel.id;

                this.channelService.init({
                  type: 'messaging',
                  id: { $eq: id },
                })

                console.log(id);
            });
          });

          // var testt = '';
          // this.api.getChannel('messaging', 'testtt', name, name+'2')
          // .subscribe(response => {
          //   console.log(response);
          //   testt = response.channel.id;
          //   console.log(testt);

          //   this.channelService.init({
          //   type: 'messaging',
          //   id: { $eq: testt },
          //   });
          // });
        } else {
          console.log('User not available or name is undefined');
        }
      });
    }
  }
}
