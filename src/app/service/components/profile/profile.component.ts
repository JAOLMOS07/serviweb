import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/auth/user';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
@Input() User!:User;
@Input() context!: number;
title:string='';
/* @Output() profileEvent = new EventEmitter<any>(); */

ngOnInit(): void {
this.title = this.context === 1?'Cliente':'Trabajador';
}
}
