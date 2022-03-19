import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { debounceTime, of, Subject } from 'rxjs'

@Component({
  selector: 'app-labeled-input',
  templateUrl: './labeled-input.component.html',
  styleUrls: ['./labeled-input.component.scss']
})
export class LabeledInputComponent implements OnInit {
  @Input() label: string = ''
  @Input() value: string = ''
  @Input() debounce = false
  @Input() placeholder = ''
  @Output() valueChange = new EventEmitter()
  randomId: number

  constructor() {
    this.randomId = Math.floor(Math.random() * 1000)
  }

  ngOnInit(): void { }

  handleInputChange(value: string) {
    this.value = value

    if (this.debounce) {
      of(this.value)
        .pipe(debounceTime(300))
        .subscribe(e => this.valueChange.emit(e))
    } else {
      this.valueChange.emit(this.value)
    }
  }
}
