import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Code } from "../codes.model";
import { CodesService } from "../codes.service";

@Component({
  selector: 'app-codes',
  templateUrl: './codes-get.component.html',
  styleUrls: ['./codes-get.component.css']
})
export class CodesGetComponent implements OnInit, OnDestroy {
  codes: Code[] = [];
  // private codesSub: Subscription;

  constructor(codesService: CodesService) { }

  ngOnInit() {
    // this.codesService.getCodes();
    // this.codesSub = this.codesService.getCodeUpdateListener()
    //   .subscribe((codes: Code[]) => {
    //     this.codes = codes;
    //   });
  }

  ngOnDestroy(): void {
    // this.codesSub.unsubscribe();
  }
}
