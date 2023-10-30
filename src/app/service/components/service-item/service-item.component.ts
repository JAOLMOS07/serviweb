import { Component, Input,EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../service';

@Component({
  selector: 'app-item-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss']
})
export class ServiceItemComponent {
  @Input() service! : Service;
  @Input() context! : String;
  @Output() ServiceEvent = new EventEmitter<Service>();


  SelectService(service:Service):void{
    this.ServiceEvent.emit(service)
  }
}
