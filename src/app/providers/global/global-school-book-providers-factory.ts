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
import {environment} from '../../../environments/environment';
import {Cache} from '../../implementation/data/cache';
import {DataSource} from '../../implementation/data/data-source';
import {Repository} from '../../implementation/data/repository';
import {UriSupplier} from '../../implementation/data/uri-supplier';
import {Book} from '../../implementation/models/book/book';
import {School} from '../../implementation/models/school/school';
import {SchoolBookRepository} from '../../implementation/repositories/school-book-repository';
import {SchoolChangeDataSourceResetter} from '../../implementation/state-management/school-change-data-source-resetter';
import {SingleItemCache} from '../../implementation/state-management/single-item-cache';
import {SCHOOL_INSTANCE_CACHE} from './global-school-providers-factory';

export const SCHOOL_BOOK_DATA_SOURCE = new InjectionToken<DataSource<Book>>('school-book-data-source');
export const SCHOOL_BOOK_CACHE = new InjectionToken<Cache<Book>>('school-book-cache');
export const SCHOOL_BOOK_URI_SUPPLIER = new InjectionToken<UriSupplier>('school-book-uri-supplier');
export const SCHOOL_BOOK_SCHOOL_CHANGE_RESETTER = new InjectionToken<SchoolChangeDataSourceResetter<Book>>('school-book-school-change-resetter')

export function globalSchoolBookProvidersFactory() {
  return [
    {
      provide: SCHOOL_BOOK_URI_SUPPLIER,
      useFactory: () => new UriSupplier(`${environment.apiUri}/api/v1/schools/{schoolId}/books`)
    },
    SchoolBookRepository,
    {
      provide: SCHOOL_BOOK_CACHE,
      useFactory: () => new Cache<Book>('SchoolBookCache')
    },
    {
      provide: SCHOOL_BOOK_DATA_SOURCE,
      useFactory: (repository: Repository<Book>, cache: Cache<Book>) => new DataSource(repository, cache),
      deps: [SchoolBookRepository, SCHOOL_BOOK_CACHE]
    },
    {
      provide: SCHOOL_BOOK_SCHOOL_CHANGE_RESETTER,
      useFactory: (schoolInstanceCache: SingleItemCache<School>, cache: Cache<Book>) =>
        new SchoolChangeDataSourceResetter<Book>('SchoolBookSchoolChangeResetter', schoolInstanceCache, cache),
      deps: [SCHOOL_INSTANCE_CACHE, SCHOOL_BOOK_CACHE]
    },
  ]
}