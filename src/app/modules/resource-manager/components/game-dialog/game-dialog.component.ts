/**
 * Copyright 2020 Aion Technology LLC
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

import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Grade } from 'src/app/modules/shared/types/grade';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameRepositoryService } from '../../services/resources/game-repository.service';
import { MetaDataService } from '../../services/meta-data/meta-data.service';
import { Element } from '../../models/meta-data/element';
import { Game } from '../../models/game/game';
import { grades } from 'src/app/modules/shared/constants/grades';
import { stringify } from 'querystring';

@Component({
  selector: 'ms-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss']
})
export class GameDialogComponent {

  model: FormGroup;
  isUpdate = false;

  grades: Grade[] = grades;
  locations: string[] = ['Online', 'Offline', 'Both'];
  activityFocusList: Element[];
  leadershipSkillList: Element[];

  constructor(private dialogRef: MatDialogRef<GameDialogComponent>,
              private gameService: GameRepositoryService,
              private metaDataService: MetaDataService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.isUpdate = this.determineUpdate(data);
    this.model = this.createModel(formBuilder, data?.model);

    metaDataService.loadActivityFocuses();
    metaDataService.activityFocuses.subscribe(activityFocuses => {
      this.activityFocusList = activityFocuses;
    });

    metaDataService.loadLeadershipSkills();
    metaDataService.leadershipSkills.subscribe(leadershipSkills => {
      this.leadershipSkillList = leadershipSkills;
    });
  }

  save(): void {
    const newGame = new Game(this.model.value);
    if (this.isUpdate) {
      console.log('Updating', this.model.value);
      newGame._links = this.model.value.game._links;
      this.gameService.updateGame(newGame).then(game => {
        this.dialogRef.close(game);
      });
    } else {
      this.gameService.createGame(newGame).then(game => {
        this.dialogRef.close(game);
      });
    }
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }

  private createModel(formBuilder: FormBuilder, game: Game): FormGroup {
    const formGroup: FormGroup = formBuilder.group({
      game,
      name: ['', Validators.required],
      description: null,
      gradeLevel: ['', Validators.required],
      location,
      activityFocuses: [],
      leadershipSkills: []
    });
    if (this.isUpdate) {
      formGroup.setValue({
        game,
        name: game?.name,
        description: game?.description,
        gradeLevel: game?.gradeLevel?.toString(),
        location: game?.location?.toString(),
        activityFocuses: this.convertArray(game?.activityFocuses),
        leadershipSkills: this.convertArray(game?.leadershipSkills),
      });
    }
    return formGroup;
  }

  private convertArray(array: [any]) {
    const result = [];
    if (array) {
      for (const item of array) {
        result.push(item.name as string);
      }
    }
    console.log('result', result);
    return result;
  }

  private determineUpdate(formData: any): boolean {
    return formData !== undefined && formData !== null;
  }

}
