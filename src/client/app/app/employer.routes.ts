import { Routes } from '@angular/router';
import {RouterModule, PreloadAllModules} from '@angular/router';


//Component
import {InvalidPageComponent} from '../shared/directives/invalidPage.component';
import {UnAuthPageComponent} from '../shared/directives/unAuthPage.component';
import {AboutComponent} from '../core/publicPage/about.component';
import {ContactusComponent} from '../core/publicPage/contactus.component';
import {TermsComponent} from '../core/publicPage/terms.component';
import {PolicyComponent} from '../core/publicPage/policy.component';



export const EmployerRoutes  = RouterModule.forChild([
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    { path: 'about', component: AboutComponent},
    { path: 'contactus', component: ContactusComponent},
    { path: 'terms', component: TermsComponent},
    { path: 'policy', component: PolicyComponent},
    { path: 'home', loadChildren: './app/core/publicPage/publicPage.module#PublicPageModule' },
    { path: 'profile', loadChildren: './app/employers/profile/profile.module#ProfileModule' },
    { path: 'blog', loadChildren: './app/employers/blog/editBlog.module#EditBlogModule' },
    { path: 'dashboard', loadChildren: './app/employers/dashboard/dashboard.module#DashboardModule' },
    { path: 'jobs', loadChildren: './app/employers/job/job.module#JobModule' },
    { path: 'candidate', loadChildren: './app/employers/candidate/candidate.module#CandidateModule' },
    { path: 'settings', loadChildren: './app/core/account/account.module#AccountModule' },
    { path: '**', redirectTo: '/404', pathMatch: 'full'},
]);