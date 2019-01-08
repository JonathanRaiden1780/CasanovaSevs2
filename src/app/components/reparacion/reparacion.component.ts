import { Component, OnInit } from '@angular/core';

import { faTired, faSadTear, faGrin, faSmileBeam, faCheckSquare, faTimesCircle, faMeh, faHourglassStart, faHourglassHalf, faHourglassEnd, faVoteYea } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { MAT_STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-reparacion',
  templateUrl: './reparacion.component.html',
  styleUrls: ['./reparacion.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ReparacionComponent implements OnInit {

  faTired = faTired;
  faSadTear = faSadTear;
  faGrin = faGrin;
  faSmileBeam = faSmileBeam;
  faCheckSquare = faCheckSquare;
  faTimesCircle = faTimesCircle;
  faMeh = faMeh;
  faHourglassStart = faHourglassStart;
  faHourglassHalf = faHourglassHalf;
  faHourglassEnd = faHourglassEnd;
  faVoteYea = faVoteYea;

  value: string;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixFormGroup: FormGroup;
  sevenFormGroup: FormGroup;

  public isYes: boolean = true;
  public isNo: boolean = true;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdFormGroup: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthFormGroup: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthFormGroup: ['', Validators.required]
    });
    this.sixFormGroup = this._formBuilder.group({
      sixFormGroup: ['', Validators.required]
    });
    this.sevenFormGroup = this._formBuilder.group({
      sevenFormGroup: ['', Validators.required]
    });
  }

  onNo(){
    this.isYes=false;
  }
  onSi(){
    this.isNo=false;
  }
}
