import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/interface';
import { BuscaLivroService } from 'src/app/services/busca-livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnInit, OnDestroy {
  listaLivros: Livro[];
  campoBusca: string = '';
  subscription: Subscription;
  livro: Livro;

  itemFocadoIndex: number = -1;

  @ViewChildren('livroDaLista') livroItems: QueryList<ElementRef>;

  constructor(private service: BuscaLivroService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (items) => (this.listaLivros = this.resultadoPesquisaLivros(items)),
      error: (error) => console.error(error),
    });
    console.log(this.livroItems);
  }

  resultadoPesquisaLivros(items) {
    const livros: Livro[] = [];
    items.forEach((item) => {
      const livro: Livro = {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        pageCount: item.volumeInfo?.pageCount,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
      };
      livros.push(livro);
    });
    return livros;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
