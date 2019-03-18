import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  appitems = [
    {
      label: 'Inicio',
      faIcon: 'fas fa-igloo',
      items: [
        {
          label: 'Dashboard',
          link: '/item-1-1',
          faIcon: 'fas fa-th'
        },
        {
          label: 'Perfil',
          link: '/item-1-1',
          faIcon: 'fas fa-robot',

        }
      ]
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) { }

  public navegarMenu(evento): void {
    switch (evento.link) {
      default:
        this.router.navigate([evento.link]);
        break;
    }
  }

}
