import { Component, OnInit } from '@angular/core';
import { ApiService } from '@chatwidget/api';
import { ChannelService, ChatClientService, StreamChatModule, StreamI18nService } from 'stream-chat-angular';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { jwtDecode} from 'jwt-decode';

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
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
  ) {}

  // private handleMessage(event: MessageEvent): void {
  //   if (event.data && event.data.type === 'SET_USER') {
  //     const { user, idToken } = event.data;
  //     // Use user and idToken in the child Angular component
  //     console.log('Received user information:', user);
  
  //     // Do something with the user information, update UI, etc.
  //   }
  // }

  ngOnInit() {
    const apiKey = '63bygjq8kbu4';

    // window.addEventListener('message', this.handleMessage.bind(this));

    // const idToken = 'auth0';

    // // Decode the JWT to get user information
    // const decodedToken: any = jwtDecode(idToken);

    // // Now you can use decodedToken to access user details
    // console.log('Decoded JWT:', decodedToken);

    // // Access specific user details
    // const username = decodedToken.username;
    // const email = decodedToken.email;

    // console.log('Username:', username);
    // console.log('Email:', email);

    if (this.auth.isAuthenticated$) {

      let username = "";
    
      this.api.getToken().subscribe(response => {
        console.log(response);
      const token = response.token;
      username = response.username;
      console.log('Token: ', token);

      // this.api.addUser(name);
      // this.api.addUser(name + '2');

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
    }
  }
}
