import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input() isOpen = false
  @Output() close = new EventEmitter()
  constructor() { }

  handleCloseButtonClick() {
    this.close.emit(this.isOpen)
  }
}
