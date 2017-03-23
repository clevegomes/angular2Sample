// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {EmployerRoutes} from './employer.routes';
import {GeneralModule} from '../core/publicPage/general.module'

//Directives


//Services

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EmployerRoutes,
    GeneralModule,
    ReactiveFormsModule,

  ],
  declarations: [

  ],
  providers: [
    FormBuilder
  ],

  exports: [

  ]
})
export class EmployerModule {

  constructor(@Optional() @SkipSelf() parentModule: EmployerModule) {
    if (parentModule) {
      throw new Error('EmployerModule already loaded; Import in root module only.');
    }
  }
}
