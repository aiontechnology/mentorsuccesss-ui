/*
 * Copyright 2020-2022 Aion Technology LLC
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

import {convertEmptyStringToNull} from '../../functions/value-or-null';

/**
 * Model class the represents a teacher.
 * @author Whitney Hunter
 */
export class Personnel {
  type: string
  firstName: string
  lastName: string
  email: string
  cellPhone: string
  links: {
    self: [
      { href: string }
    ]
  };

  constructor(json?: any) {
    this.type = convertEmptyStringToNull(json?.type)
    this.firstName = convertEmptyStringToNull(json?.firstName)
    this.lastName = convertEmptyStringToNull(json?.lastName)
    this.email = convertEmptyStringToNull(json?.email)
    this.cellPhone = convertEmptyStringToNull(json?.cellPhone)
    this.links = json?.links;
  }

}
