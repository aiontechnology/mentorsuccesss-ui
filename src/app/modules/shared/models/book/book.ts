/**
 * Copyright 2020 - 2021 Aion Technology LLC
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

import { Resource } from '../resource/resource';

export class Book extends Resource {

  title: string;
  author: string;
  gradeLevel: number;
  interests: string[];
  leadershipTraits: string[];
  phonograms: string[];
  behaviors: string[];
  tag: string;

  constructor(json?: any) {
    super(json);
    this.displayName = json?.title;
    this.title = json?.title;
    this.author = json?.author;
    this.gradeLevel = json?.gradeLevel;
    this.interests = json?.interests;
    this.leadershipTraits = json?.leadershipTraits;
    this.phonograms = json?.phonograms;
    this.behaviors = json?.behaviors;
    this.tag = json?.tag;
  }

}