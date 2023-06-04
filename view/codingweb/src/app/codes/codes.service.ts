import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Code } from "./codes.model";

@Injectable({ providedIn: "root" })
export class CodesService {
  private codes: Code[] = [];
  private codesUpdated = new Subject<Code[]>();
  private addr = "http://localhost:3000/codes";
  constructor(private http: HttpClient) {};

  getCodes() {
    this.http
      .get<{ message: string; codes: Code[] }>(this.addr)
      .subscribe(codeData => {
        this.codes = codeData.codes;
        this.codesUpdated.next([...this.codes]);
      });
  }

  getCodeUpdateListener() {
    return this.codesUpdated.asObservable();
  }

  addCode(language: string, content: string) {
    const code: Code = { language: language, content: content, result: "none", performance: "none" };
    this.http
      .post<{ message: string }>(this.addr, code)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.codes.push(code);
        this.codesUpdated.next([...this.codes]);
      });
  }
}
