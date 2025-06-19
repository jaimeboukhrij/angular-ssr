import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class ContactPageComponent implements OnInit {
  private title = inject(Title)
  private meta = inject(Meta)

  ngOnInit(): void {
    this.title.setTitle('ContactPage')
    this.meta.updateTag({
      name: 'description', content: 'Este es el about page'
    })

    this.meta.updateTag(
      { name: 'og:title', content: 'About Page' }
    )
  }
}