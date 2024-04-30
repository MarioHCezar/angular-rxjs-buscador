import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { BuscaLivroService } from 'src/app/services/busca-livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  listaLivros: [];

  campoBusca: string = '';

  constructor(private service: BuscaLivroService) {}

  buscarLivros() {
    this.service.buscar(this.campoBusca).subscribe(
      (retornoAPI) => console.log(retornoAPI),
    );
  }
}
