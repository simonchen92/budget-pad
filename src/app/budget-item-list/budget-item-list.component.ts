import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { BudgetItem } from '../shared/models/budget-item.model';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})

export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem[] = new Array
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>()
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>()

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDelete(item: BudgetItem) {
    this.delete.emit(item);
  }

  onCardClick(item: BudgetItem) {
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item
    })

    dialogRef.afterClosed().subscribe(result => {
      // Check if result has a value
      if (result) {
        this.update.emit({
          old: item,
          new: result
        })
      } 
    })
  }
}
export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;
}