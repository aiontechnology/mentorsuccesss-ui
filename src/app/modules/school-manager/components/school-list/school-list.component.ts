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

import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MenuStateService} from 'src/app/implementation/services/menu-state.service';
import {Command} from '../../../../implementation/command/command';
import {AbstractListComponent} from '../../../../implementation/component/abstract-list-component';
import {SingleItemCache} from '../../../../implementation/data/single-item-cache';
import {School} from '../../../../implementation/models/school/school';
import {TableCache} from '../../../../implementation/table-cache/table-cache';
import {SCHOOL_INSTANCE_CACHE} from '../../../../providers/global-school-providers-factory';
import {SCHOOL_TABLE_CACHE} from '../../providers/school-providers-factory';
import {SCHOOL_LIST_MENU} from '../../school-manager.module';

@Component({
  selector: 'ms-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent extends AbstractListComponent<School> implements OnInit, OnDestroy {
  columns = ['select', 'name', 'city', 'state', 'district', 'phone', 'isPrivate']

  constructor(
    // for super
    menuState: MenuStateService,
    @Inject(SCHOOL_LIST_MENU) menuCommands: { name: string, factory: (isAdminOnly: boolean) => Command }[],
    @Inject(SCHOOL_TABLE_CACHE) tableCache: TableCache<School>,
    @Inject(SCHOOL_INSTANCE_CACHE) schoolInstanceCache: SingleItemCache<School>,
  ) {
    super(menuState, menuCommands, tableCache, schoolInstanceCache)
  }

  @ViewChild(MatSort) set sort(sort: MatSort) { super.sort = sort }

  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) { super.paginator = paginator }

  ngOnInit(): void {
    this.init()
      .then(() => console.log('Initialization complete', this))
  }

  ngOnDestroy(): void {
    this.destroy()
      .then(() => console.log('Destruction complete', this))
  }
}
