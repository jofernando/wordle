import { PalavraApiService } from './../palavra-api.service';
import { Component, OnInit } from '@angular/core';
import { Palavra } from '../palavra';
import { Letra } from '../letra';
import { Status } from '../status';

@Component({
  selector: 'app-palavra-resultado',
  templateUrl: './palavra-resultado.component.html',
  styleUrls: ['./palavra-resultado.component.css'],
})
export class PalavraResultadoComponent implements OnInit {
  palavras: Palavra[] = [];
  palavraDigitada: Palavra = { letras: [], palavra: '' };
  palavraInput: string = '';
  palavraRandomica: string = '';
  letra?: Letra;
  letras: Letra[] = [];
  tamanho: number = 7;
  apiURL = '';
  statusRequisicao?: number;
  constructor(private palavraApiService: PalavraApiService) { }

  ngOnInit(): void {
    this.palavraApiService
      .getPalavraRandom(this.tamanho)
      .subscribe({
        next: (v: any) => this.palavraRandomica = v[Math.floor(Math.random() * v.length)],
        error: (e) => console.log(e),
        complete: () => console.log('complete')
      });
  }

  retirarAcentos(palavra: string) :string {
    palavra = palavra.replace(new RegExp('[àáãâ]','gi'), 'a');
    palavra = palavra.replace(new RegExp('[èéê]','gi'), 'e');
    palavra = palavra.replace(new RegExp('[ìíî]','gi'), 'i');
    palavra = palavra.replace(new RegExp('[òóõô]','gi'), 'o');
    palavra = palavra.replace(new RegExp('[ùúû]','gi'), 'u');
    palavra = palavra.replace(new RegExp('[ç]','gi'), 'c');
    return palavra;
  }

  check(palavra: String): void {
    if (palavra.length == this.tamanho) {
      this.api(palavra);
    }
  }

  add(palavra: String): void {
    if (this.statusRequisicao != 200) return;
    this.palavraDigitada.letras = [];
    for (var i = 0; i < palavra.length; i++) {
      if (this.palavraRandomica?.includes(palavra.charAt(i))) {
        if (this.palavraRandomica.charAt(i) == palavra.charAt(i)) {
          this.letra = { letra: palavra.charAt(i), status: Status.CORRETA };
        } else {
          this.letra = {
            letra: palavra.charAt(i),
            status: Status.ORDEM_INCORRETA,
          };
        }
      } else {
        this.letra = { letra: palavra.charAt(i), status: Status.INCORRETA };
      }
      this.palavraDigitada.letras.push(this.letra);
      if(!this.letras.map((a) => a.letra).includes(this.letra.letra)) {
        this.letras.push(this.letra);
        this.letras.sort((a, b) => a.letra.localeCompare(b.letra))
      }
    }
    this.palavraDigitada.palavra = palavra;
    this.palavras.push(this.palavraDigitada);
    this.limparInputs();
  }

  limparInputs(): void {
    this.palavraInput = '';
    this.letra = { letra: '', status: 0 };
    this.palavraDigitada = { palavra: '', letras: [] };
  }

  api(palavra: String) {
    const data = this.palavraApiService.getPalavra(this.palavraInput)
      .subscribe({
        next: (v) => this.statusRequisicao = 200,
        error: (e) => {this.statusRequisicao = 400; this.limparInputs()},
        complete: () => this.add(palavra)
      });
    return data;
  }
}
