import { Routes } from '@angular/router';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {JobSeekerRoutes} from './jobseeker.routes';
import {EmployerRoutes} from './employer.routes';
import {Inject} from '@angular/core';
import {AccountService} from '../core/account/services/account.service';





export class customRoutes {

  public customRoutes;
  constructor(@Inject(AccountService)  accountService:AccountService) {

    this.customRoutes = (accountService.getCheckEmployer())?JobSeekerRoutes:EmployerRoutes;
  }

  static getCustomRoutes() {

    return JobSeekerRoutes;
  }

}

// // TODO: , {preloadingStrategy: PreloadAllModules} if neededed