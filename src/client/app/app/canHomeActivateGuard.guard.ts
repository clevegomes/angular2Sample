import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {CanActivate, Router} from '@angular/router';
import { AccountService } from '../core/account/services/account.service';
import {ConfigService} from "../shared/config.service";

@Injectable()
export class CanHomeActivateGuard implements CanActivate {

    public isPublic : boolean;

    constructor(private _accountService: AccountService,private _router:Router,private _location: Location) {}

    canActivate() {
        if (this._accountService.getAuth()){
            if (this._accountService.getCheckEmployer()) {
                this._router.navigate(['/employer/profile']);
            }else{
                this._router.navigate(['/'+ConfigService.jobseekerPath+'/profile']);
            }
        }

        return !this._accountService.getAuth();

    }
}