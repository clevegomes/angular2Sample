import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { SharedModule } from '../shared/shared.module';
import {DisplayBlockModule} from '../shared/displayBlock.module';
import { ProfileService } from '../core/services/profile.service';
import { EmployerService } from '../core/services/employer.service';
import {TopLevelRoutes} from '../app/toplevel.router';
import {Http} from '@angular/http';
import {AccountService} from  '../core/account/services/account.service';
import {CookieService} from  '../core/services/cookie.service';
import {Inject,getModuleFactory} from '@angular/core';

import {CanEmpActivateGuard} from './canEmpActivateGuard.guard';
import {CanJobActivateGuard} from './canJobActivateGuard.guard';
import {CanHomeActivateGuard} from './canHomeActivateGuard.guard';
import {CanLoadGuard} from './canLoadGuard.guard';

//Component
import {InvalidPageComponent} from '../shared/directives/invalidPage.component';
import {UnAuthPageComponent} from '../shared/directives/unAuthPage.component';
import {SwitchPageComponent} from '../shared/directives/switchPage.component';
import {RedirectComponent} from '../app/redirect.component';

//service
import {ErrorHandling} from '../core/services/errorHandling.service';

/**
 * Layout Components
 */

@NgModule({
  imports: [BrowserModule,
    HttpModule,
    TopLevelRoutes,
    DisplayBlockModule,
  	SharedModule.forRoot()
  ],
  declarations: [AppComponent,
    InvalidPageComponent,
    UnAuthPageComponent,
    SwitchPageComponent,
    RedirectComponent],
  providers: [
    ErrorHandling,
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    },
    CanLoadGuard,
    CanEmpActivateGuard,
    CanJobActivateGuard,
    CanHomeActivateGuard,
    AccountService,ProfileService,EmployerService,CookieService],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private _http:Http,@Inject(AccountService) authService:AccountService) {


  }

}
