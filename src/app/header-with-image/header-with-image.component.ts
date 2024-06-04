import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-with-image',
  templateUrl: './header-with-image.component.html',
  styleUrls: ['./header-with-image.component.scss'],
})
export class HeaderWithImageComponent  implements OnInit {

  @Input() imageUrl: string = '';
  @Input() altText: string = 'Header Image';

  constructor() { }

  ngOnInit() {}

}