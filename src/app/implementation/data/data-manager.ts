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

export interface DataManager<T> {

  add: (value: T) => Promise<T>;

  allValues: () => Promise<T[]>;

  oneValue: (id: string) => Promise<T>;

  remove: (value: T) => Promise<T>;

  removeSet: (values: T[]) => Promise<T[]>;

  update: (value: T) => Promise<T>;

  updateSet: (values: T[]) => Promise<T[]>;

}
