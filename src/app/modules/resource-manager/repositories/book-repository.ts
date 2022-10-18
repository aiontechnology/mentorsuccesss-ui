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

import {Inject, Injectable} from '@angular/core';
import {Book} from '../../shared/models/book/book';
import {HttpClient} from '@angular/common/http';
import {Repository} from '../../../implementation/data/repository';
import {UriSupplier} from '../../../implementation/data/uri-supplier';
import {BOOK_URI_SUPPLIER} from '../providers/book-providers-factory';

@Injectable()
export class BookRepository extends Repository<Book> {

  constructor(http: HttpClient,
              @Inject(BOOK_URI_SUPPLIER) uriSupplier: UriSupplier) {
    super(http, uriSupplier);
  }

  protected override toModel = (value: any): Book => {
    return new Book(value);
  }

}
