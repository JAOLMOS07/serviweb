import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Router, RouterModule } from '@angular/router';
import { VoucherComponent } from '../../components/voucher/voucher.component';
import { Voucher } from 'src/app/service/service';
@Component({
  selector: 'app-veryfy-vouchers',
  providers: [AdminService],
  standalone: true,
  imports: [CommonModule, VoucherComponent, RouterModule],
  templateUrl: './veryfy-vouchers.component.html',
  styleUrls: ['./veryfy-vouchers.component.scss'],
})
export class VeryfyVouchersComponent implements OnInit {
  vouchers!:Voucher[];
  router = inject(Router);
  adminService = inject(AdminService);
  ngOnInit(): void {
    this.adminService.getVouchersToVerify().subscribe(
      (res: Voucher[]) => {
        this.vouchers = res;
      },
      (error: any) => {
        //Algún error al obtener los vouchers
        console.error('ERROR en los vouchers ', error.message);
      }
    );
  }
  SelectVoucher(voucher: Voucher): void {
    this.adminService.verifyVoucher(voucher).subscribe(
      (res: Voucher) => {
        "voucher verificado"
      },
      (error: any) => {
        //Algún error al obtener los vouchers
        console.error('ERROR en los vouchers ', error.message);
      }
    );
  }
}
