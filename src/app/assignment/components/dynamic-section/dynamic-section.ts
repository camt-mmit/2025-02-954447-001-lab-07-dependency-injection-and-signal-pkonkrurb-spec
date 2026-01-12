import { Component, computed, input, model, output } from '@angular/core';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input';

@Component({
  selector: 'app-dynamic-section',
  standalone: true,
  imports: [DynamicInputComponent],
  templateUrl: './dynamic-section.html',
  styleUrl: './dynamic-section.scss',
})
export class DynamicSectionComponent {
  // 1. รับ/ส่ง ข้อมูลตัวเลขใน Section นี้ (Two-way binding)
  readonly numbers = model<number[]>([]);

  // 2. รับค่าว่า "ลบ Section นี้ได้ไหม" (ถ้าเหลืออันเดียว จะเป็น false)
  readonly canDelete = input(true);

  // 3. ✅ รับเลขลำดับ Section เพื่อเอาไปโชว์ (เช่น Section 1, Section 2)
  readonly sectionIndex = input<number>(0);

  // 4. ส่ง Event บอกตัวแม่ว่า "ช่วยลบหนูหน่อย"
  readonly remove = output<void>();

  // 5. คำนวณผลรวมอัตโนมัติ (จะเปลี่ยนค่าเองเมื่อ numbers เปลี่ยน)
  readonly result = computed(() => {
    return this.numbers().reduce((sum, current) => sum + (current || 0), 0);
  });

  // --- Functions สำหรับจัดการ Input ลูก ---

  // เพิ่ม Input ใหม่ (ใส่เลข 0 ต่อท้าย)
  addInput() {
    this.numbers.update((curr) => [...curr, 0]);
  }

  // อัปเดตค่าเมื่อลูกมีการพิมพ์แก้
  updateNumber(index: number, newValue: number) {
    this.numbers.update((curr) => {
      const newArr = [...curr];
      newArr[index] = newValue;
      return newArr;
    });
  }

  // ลบ Input ลูก
  removeInput(index: number) {
    this.numbers.update((curr) => curr.filter((_, i) => i !== index));
  }
}
