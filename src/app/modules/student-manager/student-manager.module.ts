/**
 * Copyright 2020 - 2021 Aion Technology LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { StudentManagerComponent } from './student-manager.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFrameComponent } from './components/student-frame/student-frame.component';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentCacheService } from './services/student/student-cache.service';
import { LpgRepositoryService } from './services/lpg/lpg-repository.service';
import { StudentRepositoryService } from './services/student/student-repository.service';
import { TeacherRepositoryService } from 'src/app/modules/school-manager/services/teacher/teacher-repository.service';
import { TeacherGradeFilterPipe } from '../shared/pipes/teacher-grade-filter.pipe';
import { MetaDataService } from '../shared/services/meta-data/meta-data.service';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { MentorRepositoryService } from 'src/app/modules/mentor-manager/services/mentor/mentor-repository.service';
import { ScrollToDirective } from './directives/scroll-to.directive';

const routes: Routes = [
  {
    path: '', component: StudentManagerComponent,
    children: [
      { path: '', component: StudentFrameComponent },
      { path: 'schools/:schoolId/students/:studentId', component: StudentDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [
    StudentManagerComponent,
    StudentListComponent,
    StudentFrameComponent,
    StudentDialogComponent,
    TeacherGradeFilterPipe,
    StudentDetailComponent,
    ScrollToDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule.forRoot()
  ],
  providers: [
    StudentCacheService,
    StudentRepositoryService,
    LpgRepositoryService,
    TeacherRepositoryService,
    MetaDataService,
    MentorRepositoryService
  ]
})
export class StudentManagerModule { }