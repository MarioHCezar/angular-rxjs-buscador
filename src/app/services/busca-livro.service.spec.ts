import { TestBed } from '@angular/core/testing';

import { BuscaLivroService } from './busca-livro.service';

describe('BuscaLivroService', () => {
  let service: BuscaLivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaLivroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
