/*
 * Copyright 2022 Aion Technology LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, Inject} from '@angular/core';
import {SingleItemCache} from '../../../../../implementation/state-management/single-item-cache';
import {STUDENT_INSTANCE_CACHE} from '../../../../../providers/global/global-student-providers-factory';
import {Student} from '../../../../../models/student/student';

@Component({
  selector: 'ms-student-teacher-input',
  templateUrl: './student-teacher-input.component.html',
  styleUrls: ['./student-teacher-input.component.scss']
})
export class StudentTeacherInputComponent {
  isHistoric = false

  constructor(@Inject(STUDENT_INSTANCE_CACHE) public studentCache: SingleItemCache<Student>) { }
}
