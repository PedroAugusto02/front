import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoaderService } from '../../service/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loader-circular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader-circular.component.html',
  styleUrls: ['./loader-circular.component.css']
})
export class LoaderCircularComponent implements OnInit {
  isActive: boolean = false;

  constructor(
    private loaderService: LoaderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.loaderService.loader.subscribe(data => {
      this.isActive = data;

      if (isPlatformBrowser(this.platformId)) {
        const content = document.querySelector('.container-fluid') as HTMLElement;
        if (content) {
          if (data) {
            content.style.pointerEvents = 'none';
            content.style.opacity = '0.6';
            content.style.cursor = 'wait';
          } else {
            content.style.pointerEvents = 'auto';
            content.style.opacity = '1';
            content.style.cursor = 'default';
          }
        } else {
          console.error('Content container not found');
        }
      }
    });
  }
}
