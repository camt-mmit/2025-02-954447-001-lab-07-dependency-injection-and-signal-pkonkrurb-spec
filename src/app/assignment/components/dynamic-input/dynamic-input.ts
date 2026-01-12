import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input
      type="number"
      [ngModel]="value()"
      (ngModelChange)="value.set($event)"
      class="app-cl-code"
    />

    <button
      type="button"
      [disabled]="!canDelete()"
      (click)="remove.emit()"
      class="app-cmp-button app-cl-warn app-cl-filled"
      style="margin-left: 8px;"
    >
      <i class="material-symbols-outlined">delete_forever</i>
    </button>
  `,
  // ไม่ต้องใช้ไฟล์ scss แยกก็ได้ เขียน inline style นิดหน่อยพอ
})
export class DynamicInputComponent {
  readonly value = model<number>(0);
  readonly canDelete = input(true); // รับค่าว่าลบได้ไหม
  readonly remove = output<void>();
}
