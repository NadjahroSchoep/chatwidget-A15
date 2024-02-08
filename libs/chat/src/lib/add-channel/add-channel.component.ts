import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChannelService, ChatClientService, StreamChatModule, StreamI18nService } from 'stream-chat-angular';
import { ApiService } from '@chatwidget/api';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'chatwidget-add-channel',
  standalone: true,
  imports: [CommonModule, StreamChatModule, FormsModule],
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
})
export class AddChannelComponent {
  channelName = '';
  inputValue = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
  ) {}

  queryUsers(value: string) {
    // this.api.apiCall(value).subscribe(response => {
    //   // handle response
    // });
  }

  addChannel() {
    // add channel logic here
  }
}
