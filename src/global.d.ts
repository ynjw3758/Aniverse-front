
declare namespace NodeJS{
    interface processEnv{
            NODE_ENV :'dev' | 'production' | 'test';
            PUBLIC_URL:string;
            REACT_APP_ACCESS_KEY :string;
            REACT_APP_SERVICE_ID:string;
            REACT_APP_SECRET_KEY:string;
            REACT_APP_REDIRECT_URL:string;
            REACT_APP_REST_API_KEY:string;
            REACT_APP_CLIENT_ID:string;
            REACT_APP_REDIRECT_URL_N:string;


    }
}


declare module "*.module.scss" {
    const content: { [className: string]: string };
    export = content;
  }