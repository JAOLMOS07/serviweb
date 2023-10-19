import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/auth/user';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
@Input() User!:User;

}
