import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-core',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './core.html',
  styleUrl: './core.css'
})
export class Core {
  @Input() isOpen = false;

}
