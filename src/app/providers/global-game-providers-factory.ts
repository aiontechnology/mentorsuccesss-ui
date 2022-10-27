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

import {InjectionToken} from '@angular/core';
import {environment} from '../../environments/environment';
import {Cache} from '../implementation/data/cache';
import {DataSource} from '../implementation/data/data-source';
import {Repository} from '../implementation/data/repository';
import {UriSupplier} from '../implementation/data/uri-supplier';
import {GameRepository} from '../implementation/repositories/game-repository';
import {Game} from '../implementation/models/game/game';

export const GAME_DATA_SOURCE = new InjectionToken<DataSource<Game>>('game-data-source');
export const GAME_CACHE = new InjectionToken<Cache<Game>>('game-cache');
export const GAME_URI_SUPPLIER = new InjectionToken<UriSupplier>('game-uri-supplier');

export function globalGameProvidersFactory() {
  return [
    {
      provide: GAME_URI_SUPPLIER,
      useFactory: () => new UriSupplier(`${environment.apiUri}/api/v1/games`)
    },
    GameRepository,
    {
      provide: GAME_CACHE,
      useFactory: () => new Cache<Game>()
    },
    {
      provide: GAME_DATA_SOURCE,
      useFactory: (repository: Repository<Game>, cache: Cache<Game>) => new DataSource<Game>(repository, cache),
      deps: [GameRepository, GAME_CACHE]
    },
  ]
}