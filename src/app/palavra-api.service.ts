import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Random } from './Random';
import { Significado } from './significado';

@Injectable({
  providedIn: 'root'
})
export class PalavraApiService {

  constructor(private http: HttpClient) {
  }

  getPalavra(palavra: string) {
    return this.http.get<Significado[]>(`https://significado.herokuapp.com/${palavra}`);
  }

  getPalavraRandom(tamanho: number) {
    return this.http.get(`http://localhost:3333/tamanho/${tamanho}`);
  }
}
