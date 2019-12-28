import { Component, ElementRef, Input, OnInit } from '@angular/core';
import ImgCache from 'imgcache.js';

@Component({
  selector: 'lazy-image',
  templateUrl: 'lazy-image.html'
})

export class LazyImageComponent implements OnInit {

  @Input() src: string;

  public img: HTMLImageElement;
  public hidden: boolean;

  constructor(public el: ElementRef) {
    this.hidden = true;
  };

  ngOnInit() {
    var me = this;
    this.img = this.el.nativeElement.querySelector('img');
    // this.img.crossOrigin = 'Anonymous';
    // check if the images are already cached
    ImgCache.isCached(me.src, (path: string, success: boolean) => {

      // if not, it will be cached
      if (success) {

        ImgCache.useCachedFile(me.img, () => { });

      } else {

        ImgCache.cacheFile(me.src, () => { });

      }

    });
  }

  /**
   * This function will show the image when it has loaded
   */
  load(): void {
    this.hidden = false;
  }

  /**
   * This function will be triggered when http request fails
   */
  error(): void {
    this.img.remove();
  }

}
