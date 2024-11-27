import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input()
  public placeHolder: string = 'Search...';

  @Output()
  public onCapitalValue: EventEmitter<string> = new EventEmitter();

  onSearchCapital( term: string ): void {
    this.onCapitalValue.emit(term);
  }

}
