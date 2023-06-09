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

import {Cache} from './cache';
import {DataManager} from './data-manager';
import {Repository} from './repository';

/**
 * Acts as a datasource for objects of the given type. Data can be fetched from the cache if it is available or from the backend via REST
 * calls.
 */
export class DataSource<T> implements DataManager<T> {

  constructor(private repository: Repository<T>,
              private cache?: Cache<T>) {
  }

  add = (value: T): Promise<T> => {
    if (this.cache) {
      return this.loadCache()
        .then(() => this.repository.add(value)
          .then(this.cache.add));
    } else {
      return this.repository.add(value)
    }
  }

  allValues = async (): Promise<T[]> => {
    await this.loadCache()
    return this.cache.allValues()
  }

  oneValue = (id: string): Promise<T> => {
    if (this.cache) {
      return this.cache.oneValue(id)
        .then(value => value || this.repository.oneValue(id))
    } else {
      return this.repository.oneValue(id);
    }
  }

  remove = (value: T): Promise<T> =>
    this.loadCache()
      .then(() => this.repository.remove(value)
        .then(() => this.cache.remove(value)))

  removeSet = (values: T[]): Promise<T[]> =>
    this.loadCache()
      .then(() => this.repository.removeSet(values)
        .then(this.cache.removeSet))

  update = (value: T): Promise<T> => {
    if (this.cache) {
      return this.loadCache()
        .then(() => this.repository.update(value)
          .then(this.cache.update));
    } else {
      return this.repository.update(value)
    }
  }

  updateSet = (values: T[]): Promise<T[]> =>
    this.cache.updateSet(values)
      .then(() => this.repository.updateSet(values))

  private loadCache = async (): Promise<void> => {
    if(this.cache && !this.cache.isLoaded) {
      const values = await this.repository.allValues()
      this.cache.put(values)
    }
  }
}
