import { Component, OnInit , Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../../../global'


@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit {
  @Input() title: string;
  @Input() msg : string;
  data : FormData[] =[];

  constructor(public infoModal: NgbActiveModal,
    private httpClient: HttpClient,
    private globals: Globals


    ) { }

  ngOnInit() {




  }



  closePoolModal() {
    this.infoModal.close('Ventana Cerrada'+this.title);
  }

}
