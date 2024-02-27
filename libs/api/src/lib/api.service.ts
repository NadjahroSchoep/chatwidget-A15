import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7183';

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    ) { } 

  getToken(): Observable<any>{
    return this.http.get(`${this.baseUrl}/stream/token`,{responseType: 'json'})
  }

  getChannel(channelType: string, channelId: string, user1: string, users: string[]): Observable<any> {
    const usersQueryParam = users.map(user => `&users=${user}`).join('');
    return this.http.get(`${this.baseUrl}/stream/channel?channelType=${channelType}&channelId=${channelId}&user1=${user1}${usersQueryParam}`);
  }

  getUsers(options: { username?: string, ascending?: boolean }): Observable<any> {
    if (!options.username && !options.ascending) {
      return this.http.get(`${this.baseUrl}/stream/users`)
    } else if(!options.username) {
      return this.http.get(`${this.baseUrl}/stream/users?ascending=${options.ascending}`)
    } else if(!options.ascending) {
      return this.http.get(`${this.baseUrl}/stream/users?username=${options.username}`)
    }

    return this.http.get(`${this.baseUrl}/stream/users?username=${options.username}&ascending=${options.ascending}`)
  }

  getUserChannels(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/stream/channels?user=${username}`)
  }

  createChannel(channelId: string, users: string[]): Observable<any>  {
    const headers = { 'Content-Type': 'application/json' };
    const body = { channelId: channelId, users: users };
  
    return this.http.post<any>(`${this.baseUrl}/stream/create-channel`, body, { headers: headers });
  }
  
  addUser(username: string) {
    const headers = { 'Content-Type': 'application/json' };
  
    this.http.post<any>(`${this.baseUrl}/stream/user?username=${username}`, { headers: headers })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  addMessage(channelType: string, channelId: string, user: string, message: string): Observable <any> {
    const headers = { 'Content-Type': 'application/json' };
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    // const body = {
    //     user: user,
    //     message: message,
    //     channelId: channelId,
    //     channelType: channelType,
    // };

    return this.http.get<any>(`${this.baseUrl}/stream/message?channelType=${channelType}&channelId=${channelId}&user=${user}&message=${message}`, {headers})
    //  .subscribe(
    //   (response) => {
    //     // Handle the response here
    //     console.log(response);
    //     console.log('success post');
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );
  }

  // getToken() {
  //   // Define the request body
  //   const requestBody = {
  //     client_id: 'J5GIHQQAdxXZyI6CMLLaWMBc47XNHoBy',
  //     client_secret: 'j96fAfEFYT8z4X2ndEAKyMt5o8Luj1E89Itw3er4KwDby_u7AARf14WXmL8c14qX',
  //     audience: 'https://hello-world.com',
  //     grant_type: 'client_credentials'
  //   };
  
  //   // Define the headers
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  
  //   // Make the POST request
  //   return this.http.post('/oauth/token', requestBody, { headers })
  //     .subscribe(
  //       (response) => {
  //         // Handle the response here
  //         console.log('Token response:', response);
  //         // this.sendToken(response);
  //       },
  //       (error) => {
  //         // Handle errors here
  //         console.error('Error:', error);
  //       }
  //     );
  // }
}
