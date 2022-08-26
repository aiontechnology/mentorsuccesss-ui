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

import {LinksHolder} from 'src/app/implementation/repository/links-holder';
import {resourceLocations} from '../../constants/locations';
import {LinkServiceService} from '../../services/link-service/link-service.service';

export abstract class Resource implements LinksHolder<Resource> {

  id: string;
  location: string;
  leadershipSkills: string[];
  leadershipTraits: string[];
  links: {
    self: [
      { href: string }
    ]
  };

  // The name / title of the resource being referenced for drop list data.
  displayName: string;

  constructor(json?: any) {
    this.id = json?.id;
    this.location = json?.location;
    this.leadershipSkills = json?.leadershipSkills;
    this.leadershipTraits = json?.leadershipTraits;
    this.links = json?.links;
  }

  clearLinks(): Resource {
    this.links = undefined;
    return this;
  }

  getSelfLink(): string {
    return LinkServiceService.selfLink(JSON.stringify(this));
  }

  get displayLocation(): string {
    return resourceLocations[this.location] ?? '';
  }

}
