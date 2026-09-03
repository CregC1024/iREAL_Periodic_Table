import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Element } from './element.model';
import { ElementService } from './element.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly api = inject(ElementService);

  readonly elements = toSignal(this.api.getElements(), { initialValue: [] as Element[] });
  readonly categories = toSignal(this.api.getCategories(), { initialValue: [] as string[] });

  readonly query = signal('');
  readonly category = signal<string | null>(null);
  readonly phase = signal<string | null>(null);
  readonly selected = signal<Element | null>(null);
  readonly hovered = signal<Element | null>(null);

  readonly phases = ['solid', 'liquid', 'gas'];

  readonly matches = computed(() => {
    const q = this.query().trim().toLowerCase();
    const cat = this.category();
    const ph = this.phase();
    const ids = new Set<number>();
    for (const e of this.elements()) {
      if (cat && e.category !== cat) continue;
      if (ph && e.phase !== ph) continue;
      if (q && !(e.name.toLowerCase().includes(q) || e.symbol.toLowerCase() === q || String(e.number) === q)) continue;
      ids.add(e.number);
    }
    return ids;
  });

  readonly filtering = computed(() => !!this.query().trim() || !!this.category() || !!this.phase());
  readonly matchCount = computed(() => this.matches().size);
  readonly info = computed(() => this.hovered() ?? this.selected());

  isDimmed(e: Element): boolean {
    return this.filtering() && !this.matches().has(e.number);
  }

  slug(category: string): string {
    return category.replace(/\s+/g, '-');
  }

  select(e: Element): void {
    this.selected.set(this.selected()?.number === e.number ? null : e);
  }

  toggleCategory(c: string): void {
    this.category.set(this.category() === c ? null : c);
  }

  togglePhase(p: string): void {
    this.phase.set(this.phase() === p ? null : p);
  }

  clearFilters(): void {
    this.query.set('');
    this.category.set(null);
    this.phase.set(null);
  }

  navigate(delta: number): void {
    const cur = this.selected();
    if (!cur) return;
    const next = this.elements().find((e) => e.number === cur.number + delta);
    if (next) this.selected.set(next);
  }
}
