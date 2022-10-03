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

import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';
import {DataManager} from './data-manager';
import {UriSupplier} from './uri-supplier';
import {LinkService} from '../../modules/shared/services/link-service/link.service';

export abstract class Repository<T> implements DataManager<T> {
  protected abstract toModel: (value: any) => T;

  protected constructor(private http: HttpClient,
                        private uriSupplier: UriSupplier) {
  }

  add = (value: T): Promise<T> => {
    const that = this;
    return this.http.post<T>(this.uriSupplier.apply(), value)
      .pipe(
        map(that.toModel)
      )
      .toPromise();
  }

  allValues = (): Promise<T[]> =>
    this.http.get<{ content: T[] }>(this.uriSupplier.apply())
      .pipe(
        map(element => element.content),
        map(values => {
          return values.map(this.toModel);
        })
      )
      .toPromise()

  oneValue = (id: string): Promise<T> =>
    this.http.get<T>(this.uriSupplier.apply(id))
      .pipe(
        map(this.toModel)
      )
      .toPromise()

  remove = (value: T): Promise<T> =>
    this.http.delete<T>(LinkService.selfLink(value))
      .pipe(
        map(this.toModel)
      )
      .toPromise()

  removeSet = (values: T[]): Promise<T[]> => {
    const promises = values.map(value => this.remove(value));
    const joinedPromises = forkJoin({...promises});
    return new Promise(resolve => {
      joinedPromises.subscribe(() => {
        resolve(values);
      });
    });
  }

  reset = (): void => {
  }

  update = (value: T): Promise<T> =>
    this.http.put<T>(LinkService.selfLink(value), value)
      .pipe(
        map(this.toModel)
      )
      .toPromise()
}