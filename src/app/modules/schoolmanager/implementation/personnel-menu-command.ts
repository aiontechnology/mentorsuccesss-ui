/**
 * Copyright 2020 Aion Technology LLC
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

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Command } from '../../../implementation/command';
import { ConfimationDialogComponent } from '../../shared/components/confimation-dialog/confimation-dialog.component';
import { Router } from '@angular/router';
import { PersonnelDialogComponent } from '../components/personnel-dialog/personnel-dialog.component';

export class AddPersonnelCommand extends Command {

    constructor(title: string,
                private dialog: MatDialog,
                private snackBar: MatSnackBar,
                private schoolId: string) {
        super(title);
        this.group = 'personnel';
    }

    execute(): void {
        const dialogRef = this.dialog.open(PersonnelDialogComponent, {
            data: {
              schoolId: this.schoolId
            },
            width: '700px'
          });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.openSnackBar(this.snackBar, 'Personnel added', '')
                .onAction().subscribe(() => {
                  console.error('Cannot navigate to personnel');
                });
            }
          });
         }

    isEnabled(): boolean {
        return true;
    }

}

export class RemovePersonnelCommand extends Command {

  constructor(title: string,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private routeTo: string,
              private countSupplier: () => number,
              private removePersonnel: () => void,
              private postAction: () => void,
              private determineEnabled: () => boolean) {
    super(title);
    this.group = 'personnel';
  }

    execute(): void {
      const selectionCount = this.countSupplier();
      const message = `Are you sure you want to delete ${ selectionCount } personnel?`;
      const dialogRef = this.dialog.open(ConfimationDialogComponent, {
          width: '500px',
          data: {
            message
          }
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.removePersonnel();
              this.openSnackBar(this.snackBar, 'Personnel removed', '');
              if (this.routeTo) {
                  this.router.navigate([this.routeTo]);
              }
              this.postAction();
          }
      });
  }

  isEnabled(): boolean {
      return this.determineEnabled();
  }

}
