import { Injectable } from '@angular/core';
import { Drink } from './drink';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NormalDrink } from './normalDrink';
import { Session } from './session';
import { TopDrink } from './topdrink';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private drinksUrl = 'http://127.0.0.1:8000/api';
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: '1'
    })
  };
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
  };

  getDrinksHttp(userId: number): Observable<Drink[]> {
    const url = `${this.drinksUrl}/getList`;
    let httpParams = new HttpParams();
    // console.log(userId);
    // console.log(userId.toString());
    // console.log(userId.toString());
    httpParams = httpParams.append('userId', userId.toString());
    return this.http.post<Drink[]>(url, httpParams, this.options);
  }

  getNormalCart(userId: number): Observable<NormalDrink[]> {
    const url = `${this.drinksUrl}/getNormalList`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('userId', userId.toString());
    return this.http.post<NormalDrink[]>(url, httpParams, this.options);
  }

  getNormalDrinks(): Observable<NormalDrink[]> {
    const url = `${this.drinksUrl}/getNormalDrinks`;
    return this.http.get<NormalDrink[]>(url);
  }

  addDrink(id: number, userId: number): Observable<Drink> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id.toString());
    httpParams = httpParams.append('userId', userId.toString());
    const url = `${this.drinksUrl}/addDrink`;

    return this.http.post<Drink>(url, httpParams, this.options);
  }

  addDrinkNormal(id: number, userId: number, volume: number): Observable<NormalDrink> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id.toString());
    httpParams = httpParams.append('userId', userId.toString());
    httpParams = httpParams.append('volume', volume.toString());
    const url = `${this.drinksUrl}/addOrdinaryDrink`;

    return this.http.post<NormalDrink>(url, httpParams, this.options);
  }

  /** DELETE: delete the hero from the server */
  deleteDrink(drink: Drink, userId: number): Observable<Drink> { // kazva che moje da e obekt ili number vij dolniq red
    const id = drink.id;
    const url = `${this.drinksUrl}/removeFromCartApi`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id.toString());
    httpParams = httpParams.append('userId', userId.toString());

    return this.http.post<Drink>(url, httpParams, this.options);
  }

  deleteNormalDrink(drink: NormalDrink, userId: number): Observable<NormalDrink> { // kazva che moje da e obekt ili number vij dolniq red
    const id = drink.id;
    const url = `${this.drinksUrl}/removeFromCartNormal`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('id', id.toString());
    httpParams = httpParams.append('userId', userId.toString());

    return this.http.post<NormalDrink>(url, httpParams, this.options);
  }

  getDrink(id: number): Observable<Drink> {
    const url = `${this.drinksUrl}/getDrink/${id}`;
    //console.log('here');
    return this.http.get<Drink>(url);
  }

  clearList(userId: number): Observable<Drink>{
    const url = `${this.drinksUrl}/emptyCart`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('userId', userId.toString());
    return this.http.post<Drink>(url, httpParams, this.options);
  }

  /* GET drinks whose name contains search term */
  searchDrinks(term: string): Observable<Drink[]> {
    if (!term.trim()) {
      // if not search term, return empty drink array.
      return of([]);
    }
    // console.log(term);
    return this.http.get<Drink[]>(`${this.drinksUrl}/searchSuggestions?drink=${term}`);
  }

  // Get session cocktails
  getSessionsCocktails(id: number): Observable<Drink[]> {
    return this.http.get<Drink[]>(`${this.drinksUrl}/getSessionCocktails?id=${id}`);
  }
  getSessionsNormalDrinks(id: number): Observable<NormalDrink[]> {
    return this.http.get<NormalDrink[]>(`${this.drinksUrl}/getSessionNormalDrinks?id=${id}`);
  }

  changeQuantity(quantity: number, drinkId: number, userId: number): Observable<any>
  {
    const url = `${this.drinksUrl}/changeQuantity`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('quantity', quantity.toString());
    httpParams = httpParams.append('drinkId', drinkId.toString());
    httpParams = httpParams.append('userId', userId.toString());

    return this.http.post(url, httpParams, this.options);
  }

  changeQuantityNormal(mL: number, drinkId: number, userId: number): Observable<any>
  {
    const url = `${this.drinksUrl}/changeQuantityNormal`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('mL', mL.toString());
    httpParams = httpParams.append('drinkId', drinkId.toString());
    httpParams = httpParams.append('userId', userId.toString());

    return this.http.post(url, httpParams, this.options);
  }

  changeABV(abv: number, drinkId: number, userId: number): Observable<any>
  {
    const url = `${this.drinksUrl}/changeABV`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('abv', abv.toString());
    httpParams = httpParams.append('drinkId', drinkId.toString());
    httpParams = httpParams.append('userId', userId.toString());

    return this.http.post(url, httpParams, this.options);
  }

  calculate(userId: number, date: string): Observable<any> //string?
  {
    const url = `${this.drinksUrl}/calculate`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('userId', userId.toString());
    httpParams = httpParams.append('date', date);
    console.log(date);
    return this.http.post(url, httpParams, this.options);
  }

  getPrevSessions(userId: number): Observable<Session[]>
  {
    const url = `${this.drinksUrl}/prevSessions/${userId}`;
    return this.http.get<Session[]>(url);
  }

  deleteSession(sessionId: number): Observable<Session>
  {
    const url = `${this.drinksUrl}/deleteSession`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('sessionId', sessionId.toString());
    return this.http.post<Session>(url, httpParams, this.options);
  }

  getFavouriteDrinks(userId: number): Observable<any>
  {
    const url = `${this.drinksUrl}/favouriteDrink/${userId}`;
    return this.http.get(url);
  }

  getVolumeError(): Observable<any>
  {
    const url = `${this.drinksUrl}/getVolumeError`;
    return this.http.get(url);
  }

  getColors(url: string): any
  {
    const urlToCall = `${this.drinksUrl}/getColors`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('url', url.toString());
    return this.http.post(urlToCall, httpParams, this.options);
  }

  constructor(
    private http: HttpClient) { }
}
