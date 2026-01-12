import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionStorage {
  // Key สำหรับบันทึกลง LocalStorage
  private readonly key = 'ng-section-data';

  // ฟังก์ชันดึงข้อมูล (Get)
  get(): number[][] {
    const data = localStorage.getItem(this.key);
    // ถ้าไม่มีข้อมูล ให้คืนค่าอาเรย์ว่าง []
    return JSON.parse(data ?? '[]');
  }

  // ฟังก์ชันบันทึกข้อมูล (Set)
  set(data: number[][]): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}