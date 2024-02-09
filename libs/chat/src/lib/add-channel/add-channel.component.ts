import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class AddChannelComponent implements OnInit{

  channelName = '';
  inputname = '';
  users: string[] = [];
  selectedUsers: string[] = [];

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
  ) {}

  ngOnInit() {
    this.api.getUsers({}).subscribe(response => {
      this.users = response.users.map((user: any) => user.id);
      console.log(this.users);
    });
  }

  queryUsers(username?: string) {
    this.api.getUsers({username: username}).subscribe(response => {
      this.users = response.users.map((user: any) => user.id);
    });
  }

  addUser(username: string) {
    const index = this.selectedUsers.indexOf(username);
    if (index < 0) {
        // User is not in array, add them
        this.selectedUsers.push(username);
    } else {
        // User is in array, remove them
        this.selectedUsers.splice(index, 1);
    }
    console.log(this.selectedUsers);
  }

  addChannel() {
    if (this.auth.isAuthenticated$) {
          let username = "";
    
      this.api.getToken().subscribe(response => {
      // console.log(response);
      username = response.username;
      console.log(username);
      
        this.api.createChannel(this.channelName, this.selectedUsers).subscribe(response => {
          console.log(response);
        });
      });
    }
   
  }
}
