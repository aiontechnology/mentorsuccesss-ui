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

import {UriSupplier} from '../data/uri-supplier';
import {School} from '../../models/school/school';
import {SubscriptionManager} from '../reactive/subscription-manager';
import {SCHOOL_ID} from '../route/route-constants';
import {SchoolChangeDataSourceResetter} from './school-change-data-source-resetter';

export abstract class MultiItemCacheSchoolChangeHandler<T> extends SubscriptionManager {
  protected constructor(
    protected label: string,
    private schoolChangeDataSourceResetter: SchoolChangeDataSourceResetter<T>,
    private uriSupplier: UriSupplier,
  ) {
    super()
  }

  start(): void {
    console.log(`${this.label}: Start`)
    this.addSubscription(this.schoolChangeDataSourceResetter.observable.subscribe(this.onSchoolChange.bind(this)))
  }

  stop(): void {
    this.unsubscribeFromAll()
    console.log(`${this.label}: Stop`)
  }

  protected abstract handleSchoolChange(school: School): void

  private onSchoolChange(school: School): void {
    if (school) {
      this.uriSupplier.reset()
        .withSubstitution(SCHOOL_ID, school.id)
      this.handleSchoolChange(school)
    }
  }
}
