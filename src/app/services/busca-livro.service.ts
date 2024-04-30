import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interface';

@Injectable({
  providedIn: 'root',
})
export class BuscaLivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {}

  buscar(valorDigitado: string): Observable<Item[]> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, { params }).pipe(
      tap((retornoAPI) => console.log('Fluxo da API', retornoAPI)),
      map((retornoAPI) => retornoAPI.items),
      tap((retornoAPI) => console.log('Fluxo após o map', retornoAPI))
    );
  }
}
