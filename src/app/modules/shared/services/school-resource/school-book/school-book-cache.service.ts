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

import {Inject, Injectable} from '@angular/core';
import {DatasourceManager} from 'src/app/modules/shared/services/datasource-manager/datasource-manager';
import {Book} from 'src/app/modules/shared/models/book/book';
import {BehaviorSubject, Observable} from 'rxjs';
import {SCHOOL_BOOK_DATA_SOURCE} from '../../../shared.module';
import {DataSource} from '../../../../../implementation/data/data-source';

@Injectable()
export class SchoolBookCacheService extends DatasourceManager<Book> {

  readonly isLoading$: BehaviorSubject<boolean>;

  constructor(@Inject(SCHOOL_BOOK_DATA_SOURCE) private schoolBookDataSource: DataSource<Book>) {
    super();
    this.isLoading$ = new BehaviorSubject(true);
  }

  get isLoading(): Observable<boolean> {
    return this.isLoading$;
  }

  loadData = (): Promise<void> =>
    this.schoolBookDataSource.allValues()
      .then(books => {
        this.isLoading$.next(false);
        this.dataSource.data = books;
      })

}
