import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, 
    private alertify: AlertifyService, private root: ActivatedRoute) { }

  ngOnInit() {
    this.root.data.subscribe(data => {
      this.users = data['users'];
    })
  }
}
