import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private readonly pokemonService = inject(PokemonsService);
  private activatedRoute = inject(ActivatedRoute);
  public pokemon = signal<Pokemon | null>(null);
  public idQueryParam = toSignal(this.getUrlPageParam());
  private title = inject(Title);
  private meta = inject(Meta);
  ngOnInit(): void {
    this.loadPokemon();
  }

  private loadPokemon() {
    this.pokemonService
      .loadPokemon(this.idQueryParam()!)
      .pipe(
        tap(({ id, name }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Pagina del pokemon ${name}`;

          this.title.setTitle(pageTitle);

          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:title',
            content: pageTitle,
          });
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        })
      )
      .subscribe(this.pokemon.set);
  }

  private getUrlPageParam() {
    return this.activatedRoute.paramMap.pipe(map((value) => value.get('id')));
  }
}
