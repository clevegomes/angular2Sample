import { Routes } from '@angular/router';
import {RouterModule, PreloadAllModules,NoPreloading} from '@angular/router';
//Component
import {InvalidPageComponent} from '../shared/directives/invalidPage.component';
import {UnAuthPageComponent} from '../shared/directives/unAuthPage.component';
import {SwitchPageComponent} from '../shared/directives/switchPage.component';
import {RedirectComponent} from '../app/redirect.component';

import {CanLoadGuard} from './canLoadGuard.guard';

import { LeftsideBarComponent, FooterBarComponent, HeaderBarComponent } from '../app/layout/index';
import {ConfigService} from "../shared/config.service";




export const TopLevelRoutes = RouterModule.forRoot([
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    { path: '404',  component: InvalidPageComponent},
    { path: 'unauthorized',  component: UnAuthPageComponent},
    { path: '', component: SwitchPageComponent, outlet: 'switchpage' },
    { path: '', component: HeaderBarComponent, outlet: 'header' },
    { path: '', component: LeftsideBarComponent, outlet: 'leftbar' },
    { path: '', component: FooterBarComponent, outlet: 'footer' },
    { path: 'core/invite-connections', component:RedirectComponent},
    { path: 'home', loadChildren: './app/core/publicPage/publicPage.module#PublicPageModule',canLoad: [CanLoadGuard] },
    { path: ConfigService.jobseekerPath, loadChildren: './app/app/jobseeker.module#JobseekerModule',canLoad: [CanLoadGuard] },
    { path: 'employer', loadChildren: './app/app/employer.module#EmployerModule',canLoad: [CanLoadGuard]},
    { path: '**', redirectTo: '/404', pathMatch: 'full'},
]
    ,{preloadingStrategy: PreloadAllModules}
);
