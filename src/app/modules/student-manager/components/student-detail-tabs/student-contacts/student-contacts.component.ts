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
import {Contact} from '../../../../../models/contact/contact';
import {Student} from '../../../../../models/student/student';
import {STUDENT_INSTANCE_CACHE} from '../../../../../providers/global/global-student-providers-factory';

@Component({
  selector: 'ms-student-contacts',
  templateUrl: './student-contacts.component.html',
  styleUrls: ['./student-contacts.component.scss']
})
export class StudentContactsComponent {
  isHistoric = false
  isParent1Open: boolean = false
  isParent2Open: boolean = false
  isEmergencyContactOpen: boolean = false

  constructor(@Inject(STUDENT_INSTANCE_CACHE) public studentCache: SingleItemCache<Student>) { }

  get contacts(): Contact[] {
    return this.studentCache?.item?.contacts || []
  }

  get parents(): Contact[] {
    return this.contacts.filter(contact => !contact.isEmergencyContact)
  }

  get emergencyContact(): Contact {
    return this.contacts.find(contact => contact.isEmergencyContact)
  }

  toggleParent1() {
    this.isParent1Open = !this.isParent1Open
  }

  toggleParent2() {
    this.isParent2Open = !this.isParent2Open
  }

  toggleEmergencyContact() {
    this.isEmergencyContactOpen = !this.isEmergencyContactOpen
  }
}
