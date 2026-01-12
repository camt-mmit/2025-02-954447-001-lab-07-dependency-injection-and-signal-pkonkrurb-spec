import { Routes } from '@angular/router';
// Import Component หน้าหลักที่เราเพิ่งสร้าง
import { AssignmentMainComponent } from './pages/assignment-main/assignment-main';

export default [
  {
    path: '',
    component: AssignmentMainComponent, // เปิดหน้า AssignmentMain ทันที
  },
] as Routes;