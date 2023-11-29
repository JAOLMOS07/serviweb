import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule,ActivatedRoute} from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { SharingService } from '../auth/services/sharing.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  providers: [AuthService],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent  {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(AuthService);
  private sharingservice = inject(SharingService);
   session$!: Observable<Boolean>;
  ngOnInit(){
    this.session$ = this.sharingservice.sharingObservable;
  }
  public  logOut():void{
    this.service.deleteToken();

    this.router.navigateByUrl('/login');
  }
}
