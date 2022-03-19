import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  text = 'Are you sure?'
  response: null | Promise<null | boolean> = null
  resolveFn: ((val: boolean | null) => any) | null = null
  isOpened = false
  constructor() { }

  show(text = 'Are you sure?') {
    this.text = text
    this.isOpened = true

    this.response = new Promise((resolve) => {
      this.resolveFn = resolve
    })

    return this.response
  }

  confirm() {
    if (this.resolveFn)
      this.resolveFn(true)

    this.isOpened = false
  }

  deny() {
    if (this.resolveFn)
      this.resolveFn(false)

    this.isOpened = false
  }

  close() {
    if (this.resolveFn)
      this.resolveFn(null)

    this.isOpened = false
  }
}
