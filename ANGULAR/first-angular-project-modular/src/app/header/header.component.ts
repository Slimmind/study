import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false, // could be omit in angular 19
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
