import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
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

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      if (this.itemFocadoIndex > 0) {
        this.itemFocadoIndex--;
        this.focarItem(this.itemFocadoIndex);
      } else if (this.itemFocadoIndex === 0) {
        const inputElement = document.querySelector('input[type="search"]');
        if (inputElement) {
          (inputElement as HTMLElement).focus();
          this.itemFocadoIndex = -1;
        }
      }
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      if (this.itemFocadoIndex < this.listaLivros.length - 1) {
        this.itemFocadoIndex++;
        this.focarItem(this.itemFocadoIndex);
      } else if (this.itemFocadoIndex === -1) {
        this.itemFocadoIndex = 0;
        this.focarItem(this.itemFocadoIndex);
      }
      event.preventDefault();
    }
  }

  focarItem(index: number) {
    const livroItemsArray = this.livroItems.toArray();
    const itemParaFocar = livroItemsArray[index].nativeElement;
    itemParaFocar.focus();
  }
}
