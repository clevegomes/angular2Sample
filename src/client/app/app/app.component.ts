import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Config } from '../shared/index';
import {ConfigService} from '../shared/config.service'
import {AccountService} from "../core/account/services/account.service";
import {NgClass,Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';



/**.
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit {


  public navbarToggle = false;
  public diffStyle = false;
  public showMenus = true;
  public isPublic:boolean;
  public isAuthorized$:BehaviorSubject<any> = new BehaviorSubject(null);
  public isSwitchPage$:BehaviorSubject<any> = new BehaviorSubject(this.accountService.getSwitchPage());
  public sub;

  constructor(public accountService:AccountService, private _location:Location,public _router:Router) {
  }

  ngOnInit() : any {
    this.sub =this._router.events.subscribe(params => {
      this.isAuthorized$.next(this.accountService.getAuth());
      this.isPublic = (this._location.path().indexOf('/home') != -1);
    });
  }

  // ngOnChanges(){
  //   this.isSwitchPage$.next(this.accountService.getSwitchPage());
  //
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



  onMenuToggle($event:any) {
    this.navbarToggle = $event.navbarToggle;
  }

}
