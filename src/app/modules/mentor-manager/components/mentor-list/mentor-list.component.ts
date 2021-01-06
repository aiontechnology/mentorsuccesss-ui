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

import { Component, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Mentor } from '../../models/mentor/mentor';
import { School } from 'src/app/modules/shared/models/school/school';
import { MentorCacheService } from '../../services/mentor/mentor-cache.service';
import { NewDialogCommand } from 'src/app/implementation/command/new-dialog-command';
import { EditDialogCommand } from 'src/app/implementation/command/edit-dialog-command';
import { DeleteDialogCommand } from 'src/app/implementation/command/delete-dialog-command';
import { MentorDialogComponent } from '../mentor-dialog/mentor-dialog.component';
import { MenuStateService } from 'src/app/services/menu-state.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfimationDialogComponent } from 'src/app/modules/shared/components/confimation-dialog/confimation-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'ms-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.scss']
})
export class MentorListComponent implements AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  school: School;

  @Input()
  set selectedSchool(school: School) {

    this.school = school;

    if (school != null) {
      this.menuState.clear();
      this.mentorCacheService.clearSelection();
      this.mentorCacheService.establishDatasource(school.id);

      console.log('Adding mentor list menus');
      MentorListMenuManager.addMenus(this.menuState, this.router, this.dialog, this.snackBar, this.mentorCacheService, school?.id);
    }

  }

  constructor(private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog,
              private menuState: MenuStateService,
              private router: Router,
              private snackBar: MatSnackBar,
              public mentorCacheService: MentorCacheService) {
  }

  ngAfterViewInit(): void {
    this.mentorCacheService.sort = this.sort;
    this.mentorCacheService.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.menuState.clear();
  }

  displayedColumns(): string[] {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      return ['select', 'lastName', 'availability', 'cellPhone'];
    } else {
      return ['select', 'firstName', 'lastName', 'availability', 'cellPhone', 'email'];
    }
  }

}

class MentorListMenuManager {

  static addMenus(menuState: MenuStateService,
                  router: Router,
                  dialog: MatDialog,
                  snackBar: MatSnackBar,
                  mentorCacheService: MentorCacheService,
                  schoolId: string) {
    console.log('Constructing MenuHandler');
    menuState.add(new NewDialogCommand(
      'Create New Mentor',
      'mentor',
      MentorDialogComponent,
      'Mentor added',
      null,
      { schoolId },
      router,
      dialog,
      snackBar,
      () => schoolId != null));
    menuState.add(new EditDialogCommand(
      'Edit Mentor',
      'mentor',
      MentorDialogComponent,
      'Mentor updated',
      null,
      router,
      dialog,
      snackBar,
      () => ({ schoolId: schoolId, model: mentorCacheService.getFirstSelection() }),
      () => mentorCacheService.clearSelection(),
      () => mentorCacheService.selection.selected.length === 1));
    menuState.add(new DeleteDialogCommand(
      'Delete Mentor',
      'mentor',
      ConfimationDialogComponent,
      'Mentor(s) removed',
      'mentor',
      'mentors',
      router,
      dialog,
      snackBar,
      null,
      () => mentorCacheService.selectionCount,
      () => mentorCacheService.removeSelected(),
      () => { },
      () => mentorCacheService.selection.selected.length > 0));
  }

}
