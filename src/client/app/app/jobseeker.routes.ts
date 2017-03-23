import { Routes } from '@angular/router';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {AboutComponent} from '../core/publicPage/about.component';
import {ContactusComponent} from '../core/publicPage/contactus.component';
import {TermsComponent} from '../core/publicPage/terms.component';
import {PolicyComponent} from '../core/publicPage/policy.component';


export const JobSeekerRoutes = RouterModule.forChild([

    { path: 'about', component: AboutComponent},
    { path: 'contactus', component: ContactusComponent},
    { path: 'terms', component: TermsComponent},
    { path: 'policy', component: PolicyComponent},
    { path: 'settings', loadChildren: './app/core/account/account.module#AccountModule' },
    // { path: 'blog', loadChildren: './app/core/blog/blog.module#BlogModule' },
    { path: 'blog', loadChildren: './app/jobseekers/blog/listBlog.module#ListBlogModule' },
    { path: 'companies', loadChildren: './app/jobseekers/company/company.module#CompanyModule' },
    { path: 'jobs', loadChildren: './app/jobseekers/job/job.module#JobModule' },
    { path: 'dashboard', loadChildren: './app/jobseekers/dashboard/dashboard.module#DashboardModule' },
    { path: 'profile', loadChildren: './app/jobseekers/profile/profile.module#ProfileModule' },
]);