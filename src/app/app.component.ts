import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Warromaja Records';
  sticky: boolean = false;

  @ViewChild('stickyMenu') menuElement: ElementRef;
  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      this.sticky = (window.pageYOffset >= this.menuPosition) ? true : false;
    }

  menuPosition: any;

  ngAfterViewInit(){
    this.menuPosition = this.menuElement.nativeElement.offsetTop
  }
}
