import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages: Array<{user:String, message: String}> = [];
  message: string;
  title = 'chat';
  username: string;
  group: string;
  
 constructor(private appService: AppService) {
    this.appService.newUserJoin().subscribe(data => {
       this.messages.push(data);
    });
    this.appService.userLeftRoom().subscribe(data => {
      this.messages.push(data);
    });
    this.appService.newMessageReceived().subscribe(data => {
      if (data.user === this.username) {
        data.user = "You";
      }
      this.messages.push(data);
    })
 }
  Join() {
    if (!this.username || !this.group) return;
    this.appService.joinRoom({user:this.username, group: this.group});
  }

  Leave() {
     this.appService.leaveRoom({user: this.username, group: this.group});
  }
  Send() {
    this.appService.sendMessage({user:this.username, group: this.group, message: this.message});
  }

}