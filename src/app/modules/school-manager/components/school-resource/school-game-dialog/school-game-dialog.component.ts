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

import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameRepositoryService } from 'src/app/modules/shared/services/resources/game-repository.service';
import { SchoolGameRepositoryService } from '../../../services/school-resource/school-game/school-game-repository.service';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/modules/shared/models/game/game';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DropListData } from '../drop-list-data';

@Component({
  selector: 'ms-school-game-dialog',
  templateUrl: './school-game-dialog.component.html',
  styleUrls: ['./school-game-dialog.component.scss']
})
export class SchoolGameDialogComponent implements OnInit, OnDestroy {

  gamesSubscription$: Subscription;
  games: DropListData;
  localGames: DropListData;

  private schoolId: string;

  constructor(private gameService: GameRepositoryService,
              private schoolGameService: SchoolGameRepositoryService,
              private dialogRef: MatDialogRef<SchoolGameDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {

    this.schoolId = this.data?.schoolId;
    this.games = new DropListData();
    this.localGames = new DropListData(this.data?.schoolGames());

  }

  ngOnInit(): void {
    this.gameService.readAllGames();
    this.gamesSubscription$ = this.gameService.items.subscribe(
      games => {
        console.log('Creating new game datasource', games);
        /**
         * Filter out global games from the droplist
         * which are already local to the school.
         */
        const games$ = games.filter(game => !this.schoolHasGame(game));
        this.games = new DropListData(games$);
      }
    );
  }

  ngOnDestroy(): void {
    this.gamesSubscription$.unsubscribe();
  }

  save(): void {
    const newGames = this.localGames.data.map(game => game.getSelfLink());
    this.schoolGameService.updateSchoolGames(this.schoolId, newGames);
    this.dialogRef.close();
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }

  drop(event$: CdkDragDrop<Game[]>): void {

    if (event$.previousContainer === event$.container) {

      // If the item is dropped back in the same container, insert it back into (previous) sorted order.
      moveItemInArray(event$.container.data, event$.previousIndex, event$.previousIndex);

    } else {

      const prevItem = event$.previousContainer.data[event$.previousIndex];

      // Check if game is being transferred from global resources to local.
      if (event$.previousContainer.data !== this.localGames.filteredData) {
        this.games.removeFromData(prevItem);
        // Insert the game into local resources.
        this.localGames.insertToDataSorted(prevItem);
      } else {
        this.localGames.removeFromData(prevItem);
        // Insert the game back into global resources.
        this.games.insertToDataSorted(prevItem);
      }

      /**
       * Find the index of the filteredData to insert at. This overrides
       * the index the droplist item was dropped at, allowing us to
       * maintain alphabetical order.
       */
      event$.currentIndex = DropListData.sortedInsertIndex(prevItem, event$.container.data);
      if (event$.currentIndex < 0) {
        event$.currentIndex = event$.container.data.length;
      }

      // Now the filtered (visible) data can be updated.
      transferArrayItem(event$.previousContainer.data,
                        event$.container.data,
                        event$.previousIndex,
                        event$.currentIndex);

    }

  }

  moveGlobalToLocal(): void {
    this.moveTo(this.games, this.localGames);
  }

  moveLocalToGlobal(): void {
    this.moveTo(this.localGames, this.games);
  }

  private schoolHasGame(game: Game): boolean {
    for (const g of this.localGames.data) {
      if (game.id === g.id) {
        return true;
      }
    }
    return false;
  }

  private moveTo(origin: DropListData, destination: DropListData): void {

    origin.filteredData.forEach((value) => {
      destination.insertToDataSorted(value);
      destination.insertToFilteredSorted(value);
      const i = origin.data.indexOf(value);
      origin.data.splice(i, 1);
    });

    origin.filteredData = [];

  }

}
