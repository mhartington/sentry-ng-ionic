import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { captureException } from "@sentry/angular";
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( private http: HttpClient ) {}
  throwException(){
    captureException(new Error('We have an error'));
  }
  malform(){
    decodeURIComponent('%');
  }

  syntaxError(){eval('foo bar')}
  rangeError(){
    var someArray = [{ func: function () {}}];
    someArray[1].func();
  };

  fetchButFail(){
    this.http.get('https://jsonplaceholder.typicode.com/postss').pipe(
      catchError(err => throwError(err))
    ).subscribe( res => console.log('res', res) )
  }
}
