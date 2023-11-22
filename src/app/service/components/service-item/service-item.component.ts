import { Component, Input,EventEmitter, Output,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../service';

@Component({
  selector: 'app-item-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss']
})
export class ServiceItemComponent implements OnInit {
  @Input() service! : Service;
  @Input() context! : number;
  title:string="";
  @Output() ServiceEvent = new EventEmitter<Service>();
  @Output() ServiceEventV = new EventEmitter<Service>();
  @Output() ServiceEventP = new EventEmitter<Service>();
  @Output() ServiceEventR = new EventEmitter<Service>();

  ngOnInit(): void {
    this.title=this.context ===1?'Seguimiento':'Postularse';
  }

  SelectService(service:Service):void{
    this.ServiceEvent.emit(service)
  }
  SelectServiceVoucher(service:Service):void{
    this.ServiceEventV.emit(service)

  }
  SelectServiceProceso(service:Service):void{
    this.ServiceEventP.emit(service)

  }
  SelectServiceReport(service:Service):void{
    this.ServiceEventR.emit(service)

  }
}
