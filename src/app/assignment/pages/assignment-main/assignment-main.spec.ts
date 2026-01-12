import { ComponentFixture, TestBed } from '@angular/core/testing';

// ✅ จุดที่แก้ 1: ต้อง import ชื่อ Class ให้ถูก (มีคำว่า Component ต่อท้าย)
import { AssignmentMainComponent } from './assignment-main';

describe('AssignmentMainComponent', () => {
  // ✅ จุดที่แก้ 2: แก้ชื่อ Describe
  let component: AssignmentMainComponent; // ✅ จุดที่แก้ 3: แก้ Type
  let fixture: ComponentFixture<AssignmentMainComponent>; // ✅ จุดที่แก้ 4: แก้ Type Fixture

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // ✅ จุดที่แก้ 5: ใส่ชื่อ Class ที่ถูกต้องใน imports
      imports: [AssignmentMainComponent],
    }).compileComponents();

    // ✅ จุดที่แก้ 6: สร้าง Component ด้วยชื่อ Class ที่ถูกต้อง
    fixture = TestBed.createComponent(AssignmentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
