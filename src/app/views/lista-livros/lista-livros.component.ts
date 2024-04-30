import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro, VolumeInfo } from 'src/app/models/interface';
import { BuscaLivroService } from 'src/app/services/busca-livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: [];

  campoBusca: string = '';

  subscription: Subscription;

  livro: Livro;

  constructor(private service: BuscaLivroService) {}

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (items) => this.listaLivros,
      error: (error) => console.error(error),
      complete: () => console.log('Search complete'),
    });
  }

  resultadoPesquisaLivros(items) {
    const livros: Livro[] = [];
    items.forEach((item) => {
      livros.push(
        (this.livro = {
          title: item.volumeInfo?.title,
          authors: item.volumeInfo?.authors,
          publisher: item.volumeInfo?.publisher,
          publishedDate: item.volumeInfo?.publishedDate,
          description: item.volumeInfo?.description,
          pageCount: item.volumeInfo?.pageCount,
          previewLink: item.volumeInfo?.previewLink,
          thumbnail: item.volumeInfo?.imageLinks.thumbnail,
        })
      );
      return livros;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
