import { Component, OnInit, Input } from '@angular/core';
import { Letra } from '../letra';
import { Status } from '../status';

@Component({
  selector: 'app-letra-show',
  templateUrl: './letra-show.component.html',
  styleUrls: ['./letra-show.component.css']
})
export class LetraShowComponent implements OnInit {
  @Input() letra?: Letra;
  constructor() { }

  ngOnInit(): void {
  }

  classe(): String {
    switch (this.letra?.status) {
      case Status.CORRETA:
        return 'bg-success';
      case Status.INCORRETA:
        return 'bg-danger';
      case Status.ORDEM_INCORRETA:
        return 'bg-warning';
      default:
        return '';
    }
  }
}
