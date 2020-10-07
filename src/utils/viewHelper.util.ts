import nunjucks, { Environment } from 'nunjucks';
import { Express } from 'express';
import { format, utcToZonedTime } from 'date-fns-tz';

export const setUpNunjucks = (app: Express): Environment => {
  const env = nunjucks.configure(['views', 'govuk-frontend'], {
    autoescape: true,
    express: app,
  }).addGlobal('NODE_ENV', process.env.NODE_ENV)
    .addGlobal('getAsset', (name: string) => (process.env.CDN_URL || '/assets/') + name)
    // eslint-disable-next-line max-len
    .addFilter('formatDate', (date: string) => format(utcToZonedTime(new Date(date), process.env.TIMEZONE), 'dd MMMM yyyy'))
    // eslint-disable-next-line max-len
    .addFilter('formatDateTime', (date: string) => format(utcToZonedTime(new Date(date), process.env.TIMEZONE), 'EEEE dd MMMM yyyy \'at\' h:mm aaaa'));
  // ... any other globals or custom filters here

  return env;
};