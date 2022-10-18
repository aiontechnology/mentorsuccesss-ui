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

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute} from '@angular/router';
import {MenuStateService} from 'src/app/services/menu-state.service';
import {Command} from '../../../../implementation/command/command';
import {UriSupplier} from '../../../../implementation/data/uri-supplier';
import {TableCache} from '../../../../implementation/table-cache/table-cache';
import {Personnel} from '../../models/personnel/personnel';
import {PERSONNEL_URI_SUPPLIER} from '../../providers/personnel-providers-factory';
import {PERSONNEL_LIST_MENU, PERSONNEL_TABLE_CACHE} from '../../school-manager.module';

@Component({
  selector: 'ms-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.scss']
})
export class PersonnelListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(@Inject(PERSONNEL_TABLE_CACHE) public tableCache: TableCache<Personnel>,
              private menuState: MenuStateService,
              private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver,
              @Inject(PERSONNEL_URI_SUPPLIER) private personnelUriSupplier: UriSupplier,
              @Inject(PERSONNEL_LIST_MENU) private menuCommands: { name: string, factory: (isAdminOnly: boolean) => Command }[]) {
  }

  ngOnInit(): void {
    this.menuCommands.forEach(command => {
      this.menuState.add(command.factory(false))
    })

    this.route.paramMap
      .subscribe(params => {
        this.personnelUriSupplier.withSubstitution('schoolId', params.get('id'))
        this.tableCache.loadData()
          .then(() => {
            this.tableCache.clearSelection();
          });
      })
  }

  ngAfterViewInit(): void {
    this.tableCache.sort = this.sort;
    this.tableCache.paginator = this.paginator;
  }

  displayedColumns(): string[] {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      return ['select', 'type', 'firstName', 'lastName'];
    } else {
      return ['select', 'type', 'firstName', 'lastName', 'email', 'cellPhone'];
    }
  }
}
