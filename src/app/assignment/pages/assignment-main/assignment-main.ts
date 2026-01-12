import { Component, signal, effect, inject } from '@angular/core';
import { DynamicSectionComponent } from '../../components/dynamic-section/dynamic-section';
import { SectionStorage } from '../../services/section-storage';

// สร้าง Interface เก็บข้อมูลคู่กับ ID
interface SectionRow {
  id: number;      // บัตรประชาชน (ID)
  data: number[];  // ข้อมูลตัวเลข
}

@Component({
  selector: 'app-assignment-main',
  standalone: true,
  imports: [DynamicSectionComponent],
  templateUrl: './assignment-main.html',
  styleUrl: './assignment-main.scss'
})
export class AssignmentMainComponent {
  private readonly storage = inject(SectionStorage);

  // เปลี่ยนชนิดตัวแปร เป็นแบบมี ID
  readonly sections = signal<SectionRow[]>([]);

  constructor() {
    // 1. ตอนโหลด: แปลง number[][] ธรรมดา ให้เป็นแบบมี ID
    const rawData = this.storage.get();
    const initialData = rawData.length ? rawData : [[0]];

    this.sections.set(
      initialData.map(nums => ({
        id: Math.random(), // สุ่มเลขบัตรประชาชนให้มัน
        data: nums
      }))
    );

    // 2. ตอนเซฟ: แกะเฉพาะ data ไปเซฟ (ทิ้ง ID ไป เพราะไม่ต้องจำข้ามวัน)
    effect(() => {
      const dataToSave = this.sections().map(s => s.data);
      this.storage.set(dataToSave);
    });
  }

  addSection() {
    // สร้าง Section ใหม่ พร้อม ID ใหม่ที่ไม่ซ้ำใคร
    this.sections.update(curr => [
      ...curr, 
      { id: Date.now(), data: [0] } 
    ]);
  }

  updateSection(index: number, newNumbers: number[]) {
    this.sections.update(curr => {
      const newArr = [...curr];
      // อัปเดตข้อมูล แต่ยังใช้ ID เดิม (สำคัญมาก!)
      newArr[index] = { ...newArr[index], data: newNumbers };
      return newArr;
    });
  }

  removeSection(index: number) {
    // ลบออกจาก Array ตามปกติ
    // แต่เพราะเราใช้ track id ที่หน้า HTML.. Angular จะรู้ว่าต้องลบ DOM ตัวไหนทิ้ง
    this.sections.update(curr => curr.filter((_, i) => i !== index));
  }
}