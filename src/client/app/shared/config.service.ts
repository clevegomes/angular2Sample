export class ConfigService {
    //office PC
    public static DEVELOPMENT_BLOOVO_REST_NODE_API = "";

    //AWS
    public static DEVELOPMENT_BLOOVO_REST_API = "";
    // public static DEVELOPMENT_BLOOVO_REST_API = "";
    public static STAGING_BLOOVO_REST_API = "";
    public static PRODUCTION_BLOOVO_REST_API = "";


    public static DEVELOPMENT_DOMAIN = "";
    public static STAGING_DOMAIN = "";
    public static PRODUCTION_DOMAIN = "";


    public static expiremin = 60;
    public static jobseekerPath = "job-seeker";


    public static userId:any;

    public static authKey;


    public static publicRoutes = [
        '/home','/home/candidate-elevator', '/home/signup_employer',
        '/home/signup_jobseeker', '/login','/home/login','/home/signup',
        '/home/signin', '/home/forget-password', '/home/change-password'];
    public static titles = {"blogs":"Blogs","profile":"Welcome to Bloovo","jobs":"Jobs","companies":"Companies","dashboard":"Dashboard","settings":"Settings"};

    public static getNodeAPI():string {
        return this.DEVELOPMENT_BLOOVO_REST_NODE_API;
    }


    public static getSocialMediaContent() {
        return "Bloovo job website";
    }

    public static getDomain():string {


        if (String('<%= CONFIG_ENV %>') == 'prod') {
            return this.PRODUCTION_DOMAIN;
        }
        else if (String('<%= CONFIG_ENV %>') == 'staging') {
            return this.STAGING_DOMAIN;
        }
        return this.DEVELOPMENT_DOMAIN;
    }

    public static getAPI():string {
        if (String('<%= CONFIG_ENV %>') == 'prod') {
            return this.PRODUCTION_BLOOVO_REST_API;
        }
        else if (String('<%= CONFIG_ENV %>') == 'staging') {
            return this.STAGING_BLOOVO_REST_API;
        }
        return this.DEVELOPMENT_BLOOVO_REST_API;
    }

    public static getBloovoAPI():string {
        return this.getNodeAPI();
    }

}
