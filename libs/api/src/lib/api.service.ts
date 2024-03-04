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

  createChannel(channelId: string, users: string[]): Observable<any>  {
    const headers = { 'Content-Type': 'application/json' };
    const body = { channelId: channelId, users: users };
  
    return this.http.post<any>(`${this.baseUrl}/stream/create-channel`, body, { headers: headers });
  }
  
  addUser(username: string, admin: boolean, specialist: boolean): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
  
    return this.http.post<any>(`${this.baseUrl}/stream/create-user?username=${username}&admin=${admin}&specialist=${specialist}`, { headers: headers })
      // .subscribe(
      //   (response) => {
      //     console.log(response);
      //   },
      //   (error) => {
      //     console.error('Error:', error);
      //   }
      // );
  }
}