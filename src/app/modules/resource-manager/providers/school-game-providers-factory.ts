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
import {Command} from '../../../implementation/command/command';
import {DialogManager} from '../../../implementation/command/dialog-manager';
import {DataSource} from '../../../implementation/data/data-source';
import {UriSupplier} from '../../../implementation/data/uri-supplier';
import {Game} from '../../../models/game/game';
import {TableCache} from '../../../implementation/table-cache/table-cache';
import {updateDialogManagerProviders} from '../../../providers/dialog/update-dialog-manager-providers';
import {SCHOOL_GAME_DATA_SOURCE} from '../../../providers/global/global-school-game-providers-factory';
import {GameDialogComponent} from '../components/game-dialog/game-dialog.component';
import {SchoolGameDialogComponent} from '../components/school-game-dialog/school-game-dialog.component';

export const SCHOOL_GAME_TABLE_CACHE = new InjectionToken<UriSupplier>('school-book-table-cache');
export const SCHOOL_GAME_LIST_MENU = new InjectionToken<Command[]>('school-game-list-menu')
export const GAME_UPDATE_DIALOG_MANAGER = new InjectionToken<DialogManager<GameDialogComponent>>('game-update-dialog-manager')

export function schoolGameProvidersFactory() {
  return [
    ...updateDialogManagerProviders<SchoolGameDialogComponent>(GAME_UPDATE_DIALOG_MANAGER, SchoolGameDialogComponent),
    {
      provide: SCHOOL_GAME_TABLE_CACHE,
      useFactory: (dataSource: DataSource<Game>) => new TableCache('SchoolGameTableCache', dataSource),
      deps: [SCHOOL_GAME_DATA_SOURCE]
    },
  ]
}
