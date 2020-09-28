import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Sentry from "@sentry/angular";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://fb0f256de02644daa0bfe50e3db3e9d0@o437425.ingest.sentry.io/5400008",
});
const PATH_STRIP_RE  = /(http|capacitor):\/\/localhost/
function normalizeUrl(url: string, pathStripRe: RegExp): string {
  return `app://${url.replace(/^file\:\/\//, '').replace(pathStripRe, '')}`;
}

// Sentry.addGlobalEventProcessor((data:any) => {
// if (data.culprit) {
//     data.culprit = normalizeUrl(data.culprit, PATH_STRIP_RE);
//   }
//   const stacktrace =
//     data.stacktrace || (data.exception && data.exception.values && data.exception.values[0].stacktrace);
//   if (stacktrace) {
//     stacktrace.frames.forEach((frame: any) => {
//       if (frame.filename !== '[native code]' && frame.filename !== '<anonymous>') {
//         frame.filename = normalizeUrl(frame.filename, PATH_STRIP_RE);
//       }
//     });
//   }
//   console.log(data)
//   return data;
// })
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
