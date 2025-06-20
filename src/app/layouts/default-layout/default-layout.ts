import { Component } from '@angular/core';
import {Header} from "../../header/header";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-default-layout',
    imports: [
        Header,
        RouterOutlet
    ],
  templateUrl: './default-layout.html',
  styleUrl: './default-layout.css'
})
export class DefaultLayout {

}
