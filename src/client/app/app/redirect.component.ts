import {Component, OnInit} from '@angular/core';

import {Router,ActivatedRoute} from '@angular/router';

//Services
import { AccountService } from '../core/account/services/account.service';
import {ConfigService} from "../shared/config.service";


declare var jQuery:any;
@Component({
    moduleId: module.id,
    selector: "re-direct",
    templateUrl: "redirect.component.html"

})


export class RedirectComponent implements OnInit {

    public queryParamsObs;
    ngOnDestroy() {
        this.queryParamsObs.unsubscribe();
    }


    ngOnInit() {


        this.queryParamsObs = this._activeRoute.queryParams.subscribe(qparams => {


            if(this._accountService.getAuth() && !this._accountService.getCheckEmployer()) {
                this._router.navigate(['/'+ConfigService.jobseekerPath+'/profile/invite-connections'],{queryParams:{invite_contact_id:qparams["invite_contact_id"],provider:qparams["provider"]}});
            }
            else if(this._accountService.getAuth() && this._accountService.getCheckEmployer()) {
                this._router.navigate(['/employer/profile/invite-connections'],{queryParams:{invite_contact_id:qparams["invite_contact_id"],provider:qparams["provider"]}});
            }
            else {
                this._router.navigate(['/404']);
            }

        });


    }

    constructor(private _accountService:AccountService,
                private _activeRoute:ActivatedRoute,
                    private _router:Router) {


        }

}