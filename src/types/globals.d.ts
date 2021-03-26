declare namespace Sapper {
  export interface SapperRequest {
    session: any;
  }
  export interface SapperResponse {
    session: any;
  }
}

declare namespace Express {
  export interface Request {
    session: any;
  }
  export interface Response {
    session: any;
  }
}

declare namespace Intl {
  function getCanonicalLocales(locales: string | string[]): string[];

  /* class RelativeTimeFormat {
    constructor(locale: string);

      // TODO Add other properties/methods
  } */
  const RelativeTimeFormat: any; // Use this instead of the class if you don't want to declare all properties/methods
}