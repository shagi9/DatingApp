import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  user: User;

  constructor(private route: ActivatedRoute, 
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    })
  }

  updateUser() {
    console.log(this.user);
    this.alertify.success('Profile updated successfully');
    this.editForm.reset(this.user);
  }
}