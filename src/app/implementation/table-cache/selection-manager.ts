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

import {SelectionModel} from '@angular/cdk/collections';

/**
 * Class to manage the selection of a collection of model objects.
 */
export abstract class SelectionManager<T> {

  /** Manages the selection(s) of schools in the main-content table */
  selection = new SelectionModel<T>(true, []);

  get selectionCount(): number {
    return this.selection.selected.length;
  }

  /**
   * Get the number of items in the data collection.
   */
  protected abstract get dataSize(): number;

  /**
   * Get the items from the filtered collection.
   */
  protected abstract get filteredData(): T[];

  clearSelection(): void {
    this.selection.clear();
  }

  getFirstSelection(): T {
    return this.selection.selected[0];
  }

  /**
   * Whether the number of selected elements matches the total number of rows.
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    return numSelected === this.dataSize;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  masterToggle(): void {
    this.isAllSelected() ?
      this.clearSelection() :
      this.filteredData.forEach(row => this.selection.select(row));
  }

}
