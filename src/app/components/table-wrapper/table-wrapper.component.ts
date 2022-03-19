import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent implements OnInit {
  @Input() isLoading = true
  @Input() isError = false
  @Input() isOk = false
  @Input() total = 0
  @Input() currentPage = 0
  @Output() changePageEvent = new EventEmitter()

  // TODO: some logic to make a nice pagination here
  // right now it will render all of the possible pages

  get pagesAmount() {
    return Math.ceil(this.total / 10)
  }
  get pages() {
    return Array.from({ length: this.pagesAmount }).map((_, i) => i + 1)
  }

  constructor() { }

  ngOnInit(): void {
  }

  handlePageChange(page: number) {
    this.changePageEvent.emit(page)
  }
}
