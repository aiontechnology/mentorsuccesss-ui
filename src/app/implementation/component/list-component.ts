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

import {MatSort} from '@angular/material/sort';
import {NavigationService} from '../route/navigation.service';
import {MenuStateService} from '../services/menu-state.service';
import {SingleItemCache} from '../state-management/single-item-cache';
import {TableCache} from '../table-cache/table-cache';
import {MenuRegisteringComponent} from './menu-registering-component';

export abstract class ListComponent<T> extends MenuRegisteringComponent {
  protected constructor(
    // for super
    menuState: MenuStateService,
    navService: NavigationService,
    // other
    public tableCache: TableCache<T>,
    private instanceCache?: SingleItemCache<T>,
  ) {
    super(menuState, navService)
  }

  protected set sort(sort: MatSort) {
    if (sort) {
      this.tableCache.sort = sort
    }
  }

  protected override init(): void {
    super.init();
    this.loadTableCache()
      .then(() => {
        if (this.instanceCache && !this.instanceCache.isEmpty) {
          this.tableCache.jumpToItem(this.instanceCache.item)
        }
      })
  }

  protected loadTableCache = async (): Promise<void> => {
    this.tableCache.reset()
    await this.tableCache.loadData()
    this.tableCache.clearSelection()
  }
}
