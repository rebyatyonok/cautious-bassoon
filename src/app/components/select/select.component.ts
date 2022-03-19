import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

export type SelectOption = {
  label: string
  value: number
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy {
  @Input() options: SelectOption[] = []
  @Input() multiple = false
  @Input() placeholder = 'Select...'
  @Input() selectedOptions: SelectOption[] = []
  @Output() selectedOptionsChange = new EventEmitter()
  isDropdownOpened = false

  get valueToShow() {
    if (this.options.length === 0) return 'No options to select'
    if (this.selectedOptions.length === 0) return this.placeholder

    return this.selectedOptions.length > 3
      ? this.selectedOptions.length + ' items selected'
      : this.selectedOptions.map(e => e.label).join(', ')
  }

  constructor() {
    this.globalClickListener = this.globalClickListener.bind(this)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  openDropdown() {
    this.attachGlobalListener()

    this.isDropdownOpened = true
  }

  closeDropdown() {
    this.isDropdownOpened = false

    this.detachGlobalListener()
  }

  isSelected(option: SelectOption) {
    return this.selectedOptions.some(e => e.value === option.value)
  }

  handleOptionClick(option: SelectOption) {
    if (!this.multiple) {
      this.selectedOptions = [option]
      this.closeDropdown()
    } else {
      if (this.selectedOptions.some(e => e.value === option.value)) {
        this.selectedOptions = this.selectedOptions.filter(e => e.value !== option.value)
      } else {
        this.selectedOptions.push(option)
      }
    }

    this.selectedOptionsChange.emit(this.selectedOptions)
  }

  attachGlobalListener() {
    window.addEventListener('click', this.globalClickListener)
  }

  detachGlobalListener() {
    window.removeEventListener('click', this.globalClickListener)
  }

  globalClickListener(e: Event) {
    if (!e.target) return

    let target = e.target as HTMLElement
    let classesToIgnore = ['select__dropdown', 'select__dropdown__item', 'select__value']

    if (classesToIgnore.some(e => target.classList.contains(e))) return

    if (this.isDropdownOpened) {
      this.closeDropdown()
    }
  }
}
