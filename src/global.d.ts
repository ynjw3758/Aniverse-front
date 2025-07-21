
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
            REACT_APP_API_BASE_URL:string;
            REACT_APP_API_SEARCH_URL:string;
            REACT_APP_API_NOTE_URL:string;
            REACT_APP_API_REACT_URL:string;
            REACT_APP_API_UPLOAD_URL :string;
            REACT_APP_API_AI_URL:string;
            REACT_APP_API_WEBCHAT_URL:string;
            REACT_APP_API_WEBLOGIN_URL:string;
            REACT_APP_API_DEV_BASE_URL:string;
            REACT_APP_API_DEV_SEARCH_URL:string;
            REACT_APP_API_DEV_NOTE_URL:string;
            REACT_APP_API_DEV_REACT_URL:string;
            REACT_APP_API_DEV_UPLOAD_URL :string;
            REACT_APP_API_DEV_AI_URL:string;
            REACT_APP_API_DEV_WEBCHAT_URL:string;
            REACT_APP_API_DEV_WEBLOGIN_URL:string;


    }
}

declare module '*.jpg' {
  const value: string;
  export default value;
}
declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.svg' {
  const value: string;
  export default value;
}
declare module "*.module.scss" {
    const content: { [className: string]: string };
    export = content;
  }