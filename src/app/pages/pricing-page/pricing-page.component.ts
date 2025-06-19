import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title)
  private meta = inject(Meta)
  private platform = inject(PLATFORM_ID)


  ngOnInit(): void {
    if (isPlatformServer(this.platform)) {
      this.title.setTitle('PricingPrice')
      this.meta.updateTag({
        name: 'description', content: 'Este es el about page'
      })

      this.meta.updateTag(
        { name: 'og:title', content: 'About Page' }
      )
    }

  }
}
