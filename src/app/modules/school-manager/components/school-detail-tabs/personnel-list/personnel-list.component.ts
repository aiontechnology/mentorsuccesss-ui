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
import {Command} from '../../../../../implementation/command/command';
import {AbstractListComponent} from '../../../../../implementation/component/abstract-list-component';
import {SchoolUriSupplier} from '../../../../../implementation/data/school-uri-supplier';
import {Personnel} from '../../../../../implementation/models/personnel/personnel';
import {TableCache} from '../../../../../implementation/table-cache/table-cache';
import {PERSONNEL_URI_SUPPLIER} from '../../../../../providers/global-personnel-providers-factory';
import {PERSONNEL_TABLE_CACHE} from '../../../providers/personnel-providers-factory';
import {PERSONNEL_LIST_MENU} from '../../../school-manager.module';

@Component({
  selector: 'ms-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.scss']
})
export class PersonnelListComponent extends AbstractListComponent<Personnel> implements OnInit, OnDestroy {
  columns = ['select', 'type', 'firstName', 'lastName', 'email', 'cellPhone']

  constructor(
    // for super
    menuState: MenuStateService,
    @Inject(PERSONNEL_LIST_MENU) menuCommands: { name: string, factory: (isAdminOnly: boolean) => Command }[],
    @Inject(PERSONNEL_TABLE_CACHE) tableCache: TableCache<Personnel>,
    //other
    @Inject(PERSONNEL_URI_SUPPLIER) private uriSupplier: SchoolUriSupplier,
  ) {
    super(menuState, menuCommands, tableCache)
  }

  @ViewChild(MatSort) set sort(sort: MatSort) { super.sort = sort }

  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) { super.paginator = paginator }

  ngOnInit(): void {
    this.uriSupplier.observable.subscribe(this.reloadTableCache)
    this.init()
      .then(() => console.log('Initialization complete', this))
  }

  ngOnDestroy(): void {
    this.destroy()
      .then(() => console.log('Destruction complete', this))
  }
}