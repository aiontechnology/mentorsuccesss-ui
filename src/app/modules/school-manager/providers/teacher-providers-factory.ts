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

import {InjectionToken} from '@angular/core';
import {DialogManager} from '../../../implementation/command/dialog-manager';
import {Cache} from '../../../implementation/data/cache';
import {DataSource} from '../../../implementation/data/data-source';
import {UriSupplier} from '../../../implementation/data/uri-supplier';
import {School} from '../../../implementation/models/school/school';
import {Teacher} from '../../../implementation/models/teacher/teacher';
import {SchoolChangeDataSourceResetter} from '../../../implementation/state-management/school-change-data-source-resetter';
import {SingleItemCacheSchoolChangeHandler} from '../../../implementation/state-management/single-item-cache-school-change-handler';
import {TableCache} from '../../../implementation/table-cache/table-cache';
import {dialogManagerProviders} from '../../../providers/dialog-manager-providers';
import {
  TEACHER_CACHE,
  TEACHER_DATA_SOURCE,
  TEACHER_SCHOOL_CHANGE_RESETTER,
  TEACHER_URI_SUPPLIER
} from '../../../providers/global/global-teacher-providers-factory';
import {listProvidersFactory} from '../../../providers/legacy/list-menus-providers-factory';
import {ConfimationDialogComponent} from '../../shared/components/confimation-dialog/confimation-dialog.component';
import {TeacherDialogComponent} from '../components/school-detail-tabs/teacher-dialog/teacher-dialog.component';
import {TEACHER_GROUP, TEACHER_LIST_MENU} from '../school-manager.module';

export const TEACHER_TABLE_CACHE = new InjectionToken<TableCache<School>>('teacher-table-cache')
export const TEACHER_SCHOOL_CHANGE_HANDLER = new InjectionToken<SingleItemCacheSchoolChangeHandler<Teacher>>('teacher-school-change-handler')
export const TEACHER_EDIT_DIALOG_MANAGER = new InjectionToken<DialogManager<TeacherDialogComponent>>('teacher_edit-dialog-manager')
export const TEACHER_DELETE_DIALOG_MANAGER = new InjectionToken<DialogManager<ConfimationDialogComponent>>('teacher_delete-dialog-manager')

export function teacherProvidersFactory() {
  return [
    ...dialogManagerProviders<Teacher, TeacherDialogComponent, TableCache<Teacher>>(TEACHER_EDIT_DIALOG_MANAGER, TEACHER_DELETE_DIALOG_MANAGER, TeacherDialogComponent, TEACHER_TABLE_CACHE),
    ...listProvidersFactory<Teacher, TeacherDialogComponent, TableCache<Teacher>>(TEACHER_LIST_MENU, TEACHER_GROUP, 'Teacher',
      TeacherDialogComponent, TEACHER_TABLE_CACHE),
    {
      provide: TEACHER_TABLE_CACHE,
      useFactory: (dataSource: DataSource<Teacher>) => new TableCache('TeacherTableCache', dataSource),
      deps: [TEACHER_DATA_SOURCE]
    },
    {
      provide: TEACHER_SCHOOL_CHANGE_HANDLER,
      useFactory: (schoolChangeResetter: SchoolChangeDataSourceResetter<Teacher>, uriSupplier: UriSupplier, cache: Cache<Teacher>, tableCache: TableCache<Teacher>) =>
        new SingleItemCacheSchoolChangeHandler<Teacher>('TeacherSchoolChangeHandler', schoolChangeResetter, uriSupplier, cache, tableCache),
      deps: [TEACHER_SCHOOL_CHANGE_RESETTER, TEACHER_URI_SUPPLIER, TEACHER_CACHE, TEACHER_TABLE_CACHE]
    },
  ]
}
