/*
 * Copyright 2021-2022 Aion Technology LLC
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

import { Resource } from 'src/app/models/resource/resource';

/**
 * DropListData manages the stored (actual) data, and the visible, filtered data
 * presented in the Drop List.
 */
export class DropListData {

  data: Resource[];
  filteredData: Resource[];

  constructor(data: Resource[] = []) {
    this.data = data.sort(this.compareTitle).slice();
    this.filteredData = this.data.slice();
  }

  /**
   * Return the index to insert the value at to keep alphabetical order.
   * @param value The item to be inserted.
   * @param list The list the value will be sorted into.
   * @returns The index to insert at, or -1 if the list is
   * empty or if the value should be appended to the end of the list.
   */
  static sortedInsertIndex(value: Resource, list: Resource[]): number {

    if (!list.length) {
      return -1;
    }

    for (const [i, v] of list.entries()) {
      if (v.displayName.localeCompare(value.displayName) > 0) {
        return i;
      } else if (list.length === (i + 1)) {
        return -1;
      }
    }

  }

  applyTitleFilter(filterValue: string): void {
    if (filterValue === '') {
      this.filteredData = this.data.slice();
    } else {
      filterValue = this.cleanInput(filterValue);
      this.filteredData = this.data.filter((value) => this.cleanInput(value.displayName).includes(filterValue));
    }
  }

  clearInput(filter: HTMLInputElement): void {
    filter.value = '';
    this.applyTitleFilter('');
  }

  removeFromData(value: Resource): void {
    const index = this.data.indexOf(value);
    this.data.splice(index, 1);
  }

  insertToDataSorted(value: Resource): void {
    this.insertItemSorted(value, this.data);
  }

  insertToFilteredSorted(value: Resource): void {
    this.insertItemSorted(value, this.filteredData);
  }

  /**
   * Insert a value into drop list data, ordered by title.
   * @param value Item to insert.
   */
  private insertItemSorted(value: Resource, arr: Resource[]) {
    const i = DropListData.sortedInsertIndex(value, arr);
    if (i < 0) {
      arr.push(value);
    } else {
      arr.splice(i, 0, value);
    }
  }

  protected cleanInput(str: string): string {
    return str.trim().toLowerCase();
  }

  private compareTitle(a: Resource, b: Resource): number {
    if (a.displayName.localeCompare(b.displayName) < 0) {
      return -1;
    }
    if (a.displayName.localeCompare(b.displayName) > 0) {
      return 1;
    }
    return 0;
  }

}
