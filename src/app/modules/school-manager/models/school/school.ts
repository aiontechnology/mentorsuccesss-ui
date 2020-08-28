/**
 * Copyright 2020 Aion Technology LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { LinksHolder } from 'src/app/implementation/repository/links-holder';
import { Address } from '../../../shared/models/address';

export class School implements LinksHolder<School> {

    id: string;
    name: string;
    address: Address;
    phone: string;
    district: string;
    isPrivate: boolean;
    _links: {
        self: [
            { href: string; }
        ]
    };

    constructor(json?: any) {
        this.id = json?.id;
        this.name = json?.name;
        this.address = new Address(json?.address);
        this.phone = json?.phone;
        this.district = json?.district;
        this.isPrivate = json?.isPrivate;
        this._links = json?._links;
    }

    clearLinks(): School {
        this._links = undefined;
        return this;
    }

     getSelfLink(): string {
        return this._links.self[0].href;
    }

}
