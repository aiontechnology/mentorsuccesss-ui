/**
 * Copyright 2021 Aion Technology LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LinksHolder } from 'src/app/implementation/repository/links-holder';

export abstract class SchoolResourceRepository<T extends LinksHolder<any>> {

  private resources$: BehaviorSubject<T[]>;
  private dataStore: T[];

  constructor(protected path: string,
              private http: HttpClient) {
    this.resources$ = new BehaviorSubject<T[]>([]);
    this.dataStore = [];
  }

  protected get resources(): Observable<T[]> {
    return this.resources$;
  }

  protected get uriBase(): string {
    return environment.apiUri + this.path;
  }

  protected readAllResources(uri: string): void {
    console.log('Loading all resources for school:', uri);
    this.http.get(uri)
      .subscribe(data => this.getCollectionData(data));
  }

  protected updateResources(uri: string, resources: string[]): void {
    console.log('Updating resources for school:', uri);
    this.http.put(uri, resources)
      .subscribe(data => this.getCollectionData(data));
  }

  protected abstract fromJSON(json: any): T[];

  private getCollectionData(data: any): void {
    console.log('Received school resource data:', data);
    let resources = [];
    if (data?._embedded) {
      const collectionKey = Object.keys(data?._embedded)[0];
      resources = this.fromJSON(data?._embedded[collectionKey]);
    }
    this.publishResources(resources);
  }

  private publishResources(r: T[]): void {
    this.dataStore = r;
    this.resources$.next(this.dataStore);
  }

}