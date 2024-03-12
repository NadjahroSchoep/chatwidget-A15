import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StreamChatModule } from 'stream-chat-angular';
import { ApiService } from '@chatwidget/api';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Location } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'chatwidget-add-channel',
  standalone: true,
  imports: [CommonModule, StreamChatModule, FormsModule, SimplebarAngularModule],
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
})
export class AddChannelComponent implements OnInit{

  channelName = '';
  inputname = '';
  users: string[] = [];
  selectedUsers: string[] = [];
  username = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private location: Location,
  ) {}

  ngOnInit() {
    // Add the current user to the selected users
    if (this.auth.isAuthenticated$) {
      this.api.getToken().subscribe(response => {
        this.username = response.username;
        this.selectedUsers.push(this.username);
        });
    }

    // Get all users and removes the current user from the list
    this.api.getUsers({}).subscribe(response => {
      this.users = response.users.map((user: any) => user.id);
      this.users = this.users.filter(elem => elem !== this.username);
      console.log(response);
    });
  }

  // Get all users
  queryUsers(username?: string) {
    this.api.getUsers({username: username}).subscribe(response => {
      this.users = response.users.map((user: any) => user.id);
    });
  }

  // Add a user to the selected users, also removes them if they are already in the list (when a user is unselected)
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

  // Create a channel using the list of selectd users
  addChannel() {
    this.api.createChannel(this.channelName, this.selectedUsers).subscribe(
      response => {
        // console.log(response);
        this.return();
      },
      error => {
        console.error(error); // Handle error
      }
  )};

  return() {
    this.location.back();
  }
}
