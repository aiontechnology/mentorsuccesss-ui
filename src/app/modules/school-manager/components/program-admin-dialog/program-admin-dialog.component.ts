/*
 * Copyright 2020-2022 Aion Technology LLC
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
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataSource} from '../../../../implementation/data/data-source';
import {PROGRAM_ADMIN_DATA_SOURCE} from '../../../shared/shared.module';
import {ProgramAdmin} from '../../models/program-admin/program-admin';

@Component({
  selector: 'ms-program-admin-detail-dialog',
  templateUrl: './program-admin-dialog.component.html',
  styleUrls: ['./program-admin-dialog.component.scss']
})
export class ProgramAdminDialogComponent {
  model: UntypedFormGroup;
  isUpdate = false;

  constructor(private dialogRef: MatDialogRef<ProgramAdminDialogComponent>,
              private formBuilder: UntypedFormBuilder,
              @Inject(PROGRAM_ADMIN_DATA_SOURCE) private programAdminDataSource: DataSource<ProgramAdmin>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.isUpdate = this.determineUpdate(data);
    this.model = this.createModel(formBuilder, data?.model);
  }

  save(): void {
    const newProgramAdmin = new ProgramAdmin(this.model.value);
    let value: Promise<ProgramAdmin>;

    if (this.isUpdate) {
      newProgramAdmin.links = this.model.value.programAdmin.links;
      value = this.programAdminDataSource.update(newProgramAdmin);
    } else {
      value = this.programAdminDataSource.add(newProgramAdmin);
    }

    value.then((p: ProgramAdmin) => {
      this.dialogRef.close(p);
    });

  }

  dismiss(): void {
    this.dialogRef.close(null);
  }

  private createModel(formBuilder: UntypedFormBuilder, programAdmin: ProgramAdmin): UntypedFormGroup {
    const formGroup = formBuilder.group({
      programAdmin,
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      cellPhone: null,
      email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]]
    });
    if (this.isUpdate) {
      formGroup.setValue({
        programAdmin,
        firstName: programAdmin?.firstName,
        lastName: programAdmin?.lastName,
        cellPhone: programAdmin?.cellPhone,
        email: programAdmin?.email
      });
    }
    return formGroup;
  }

  private determineUpdate(formData: any): boolean {
    return formData !== undefined && formData !== null;
  }

}
