import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shop } from '../interfaces/shop';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopsService {
  constructor(private http: HttpClient) {}

  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  private url = environment.apiUrl;

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.url+"/shops");
  }
  
  getShopsByCity(city: string): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.url+"/shops/"+city);
  }

  getShopById(id: number): Observable<Shop> {
    return this.http.get<Shop>(this.url+"/shops/"+id);
  }

  addShop(shop: Shop){
    return this.http.post<Shop>(this.url+"/shops", shop)
  }

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
