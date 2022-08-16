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

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SchoolSession} from 'src/app/modules/shared/models/school/schoolsession';
import {SchoolSessionRepositoryService} from 'src/app/modules/shared/services/school-session/school-session-repository.service';

@Component({
  selector: 'ms-school-session-dialog',
  templateUrl: './school-session-dialog.component.html',
  styleUrls: ['./school-session-dialog.component.scss']
})
export class SchoolSessionDialogComponent {

  model: FormGroup;
  isUpdate = false;

  schoolId: string;

  constructor(private dialogRef: MatDialogRef<SchoolSessionDialogComponent>,
              private schoolSessionService: SchoolSessionRepositoryService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.model = this.createModel(formBuilder);
    this.schoolId = data?.schoolId;
  }

  private createModel(formBuilder: FormBuilder): FormGroup {
    const formGroup: FormGroup = formBuilder.group({
      label: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', Validators.required]
    });
    return formGroup;
  }

  /**
   * Save the form. Handles both new and updated schools.
   */
  save(): void {
    const newSession = new SchoolSession(this.model.value);
    let value: Promise<SchoolSession>;

    if (this.isUpdate) {
      console.log('Updating', this.model.value);
      newSession.links = this.model.value.school.links;
      value = this.schoolSessionService.updateSchoolSession(newSession);
    } else {
      value = this.schoolSessionService.createSchoolSession(this.schoolId, newSession);
      console.log('Saving');
    }

    value.then((ss: SchoolSession) => {
      this.dialogRef.close(ss);
    });
  }

  /**
   * Dismiss the dialog without saving.
   */
  dismiss(): void {
    this.dialogRef.close(null);
  }

}