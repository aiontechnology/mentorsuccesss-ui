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

import {JSONPath} from 'jsonpath-plus';

export class LinkService {

  static selfLink(element: any): string | null {
    const href = JSONPath({path: '$.links[?(@.rel == "self")].href', json: element});
    if (Array.isArray(href) && href.length === 1) {
      return href[0];
    }
    return null;
  }

  static clearLinks(element: any): void {
    element.links = undefined;
  }

}
