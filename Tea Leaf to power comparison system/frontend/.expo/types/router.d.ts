/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/ActiveBatches`; params?: Router.UnknownInputParams; } | { pathname: `/CompletedBatches`; params?: Router.UnknownInputParams; } | { pathname: `/Dashboard`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/LiveCollection`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/ActiveBatches`; params?: Router.UnknownOutputParams; } | { pathname: `/CompletedBatches`; params?: Router.UnknownOutputParams; } | { pathname: `/Dashboard`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/LiveCollection`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/ActiveBatches${`?${string}` | `#${string}` | ''}` | `/CompletedBatches${`?${string}` | `#${string}` | ''}` | `/Dashboard${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/LiveCollection${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/ActiveBatches`; params?: Router.UnknownInputParams; } | { pathname: `/CompletedBatches`; params?: Router.UnknownInputParams; } | { pathname: `/Dashboard`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/LiveCollection`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
