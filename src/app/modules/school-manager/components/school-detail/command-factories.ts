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

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Command} from '../../../../implementation/command/command';
import {DeleteDialogCommand} from '../../../../implementation/command/delete-dialog-command';
import {EditDialogCommand} from '../../../../implementation/command/edit-dialog-command';
import {DataSource} from '../../../../implementation/data/data-source';
import {ConfimationDialogComponent} from '../../../shared/components/confimation-dialog/confimation-dialog.component';
import {School} from '../../../shared/models/school/school';
import {SchoolCacheService} from '../../services/school/school-cache.service';
import {SchoolDialogComponent} from '../school-dialog/school-dialog.component';

export const editDialogCommandFactory = (school: School, router: Router, dialog: MatDialog, snackBar: MatSnackBar, postAction: (School) => void): EditDialogCommand<School> =>
  new EditDialogCommand<School>(
    'Edit School',
    'school',
    SchoolDialogComponent,
    'School updated',
    null,
    router,
    dialog,
    snackBar,
    () => ({model: school}),
    postAction,
    () => true);

export const deleteDialogCommandFactory = (school: School, dataSource: DataSource<School>, repositoryService: SchoolCacheService,
                                           router: Router, dialog: MatDialog, snackBar: MatSnackBar): DeleteDialogCommand<School> =>
  new DeleteDialogCommand(
    'Remove School',
    'school',
    ConfimationDialogComponent,
    'School(s) removed',
    'school',
    'schools',
    router,
    dialog,
    snackBar,
    '/schoolsmanager',
    () => 1,
    () => dataSource.remove(school)
      .then(repositoryService.loadData),
    () => true);

class InviteStudentCommand extends Command {
  constructor(title: string,
              group: string,
              private dialog: MatDialog,
              private componentType: any,
              private snackBar: MatSnackBar,
              private snackBarMessage: string,
              private enabled: () => boolean) {
    super(title, group);
  }

  protected override doExecute(): MatDialogRef<any> {
    return this.dialog.open(this.componentType, {
      width: '500px',
      disableClose: true,
      data: {
        message: 'Hello'
      }
    });
  }

  protected override doPostExecute(dialog: MatDialogRef<any>) {
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar(this.snackBar, this.snackBarMessage, '');
      }
    });
  }

  protected override isEnabled(): boolean {
    return this.enabled();
  }
}

export const inviteStudentCommandFactory = (dialog: MatDialog,
                                            componentType: any,
                                            snackBar: MatSnackBar) =>
  new InviteStudentCommand('Invite Student',
    'school',
    dialog,
    componentType,
    snackBar,
    'Invitation sent',
    () => true);