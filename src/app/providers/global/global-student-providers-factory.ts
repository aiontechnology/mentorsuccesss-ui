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
import {SingleItemCacheUpdater} from '../../implementation/state-management/single-item-cache-updater';
import {UriSupplier} from '../../implementation/data/uri-supplier';
import {Student} from '../../models/student/student';
import {StudentRepository} from '../../implementation/repositories/student-repository';
import {STUDENT_ID} from '../../implementation/route/route-constants';
import {RouteElementWatcher} from '../../implementation/route/route-element-watcher.service';
import {SingleItemCache} from '../../implementation/state-management/single-item-cache';

export const STUDENT_URI_SUPPLIER = new InjectionToken<UriSupplier>('student-uri-supplier');
export const STUDENT_CACHE = new InjectionToken<Cache<Student>>('student-cache');
export const STUDENT_DATA_SOURCE = new InjectionToken<DataSource<Student>>('student-data-source');
export const STUDENT_INSTANCE_CACHE = new InjectionToken<SingleItemCache<Student>>('student-instance-cache')
export const STUDENT_INSTANCE_CACHE_UPDATER = new InjectionToken<SingleItemCacheUpdater<Student>>('student-instance-cache-updater')
export const STUDENT_ROUTE_WATCHER = new InjectionToken<RouteElementWatcher<Student>>('student-route-watcher')

export function globalStudentProvidersFactory() {
  return [
    {
      provide: STUDENT_URI_SUPPLIER,
      useFactory: () => new UriSupplier(`${environment.apiUri}/api/v1/schools/{schoolId}/students`)
    },
    StudentRepository,
    {
      provide: STUDENT_CACHE,
      useFactory: () => new Cache<Student>('StudentCache')
    },
    {
      provide: STUDENT_DATA_SOURCE,
      useFactory: (repository: Repository<Student>, cache: Cache<Student>) => new DataSource<Student>(repository, cache),
      deps: [StudentRepository, STUDENT_CACHE]
    },
    {
      provide: STUDENT_INSTANCE_CACHE,
      useFactory: () => new SingleItemCache<Student>('StudentInstanceCache')
    },
    {
      provide: STUDENT_INSTANCE_CACHE_UPDATER,
      useFactory: (singleItemCache: SingleItemCache<Student>, dataSource: DataSource<Student>) =>
        new SingleItemCacheUpdater<Student>(singleItemCache, dataSource),
      deps: [STUDENT_INSTANCE_CACHE, STUDENT_DATA_SOURCE]
    },
    {
      provide: STUDENT_ROUTE_WATCHER,
      useFactory: (instanceCacheUpdater: SingleItemCacheUpdater<Student>) =>
        new RouteElementWatcher<Student>(instanceCacheUpdater, STUDENT_ID),
      deps: [STUDENT_INSTANCE_CACHE_UPDATER]
    },
  ]
}
