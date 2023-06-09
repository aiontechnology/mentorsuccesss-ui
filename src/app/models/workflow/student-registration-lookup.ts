/*
 * Copyright 2022-2023 Aion Technology LLC
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

import {ProgramAdmin} from '../program-admin/program-admin';
import {Teacher} from '../teacher/teacher';

export class StudentRegistrationLookup {
  constructor(
    public parent1FirstName: string,
    public parent1LastName: string,
    public parent1EmailAddress: string,
    public studentFirstName: string,
    public studentLastName: string,
    public links: { self: [{ href: string; }] },
    public teachers?: Teacher[],
    public programAdmin?: ProgramAdmin,
  ) {}

  static of(value: any): StudentRegistrationLookup {
    const teachers: Teacher[] = value?.teachers.map(t => new Teacher(t))
    const programAdmin: ProgramAdmin = value?.programAdmin !== null ? new ProgramAdmin(value?.programAdmin) : null
    return new StudentRegistrationLookup(
      value.parent1FirstName,
      value.parent1LastName,
      value.parent1EmailAddress,
      value.studentFirstName,
      value.studentLastName,
      value.links,
      teachers,
      programAdmin,
    );
  }
}
