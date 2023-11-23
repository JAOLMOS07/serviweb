import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Voucher } from 'src/app/service/service';

@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent {
  @Input() voucher!:Voucher;
  @Output() voucherEvent = new EventEmitter<Voucher>();
  SelectVoucher(voucher:Voucher):void{
    this.voucherEvent.emit(voucher);
  }
}
