import { Hono, Context } from 'hono';
import { handle } from 'hono/vercel';
import { AuthConfig, initAuthConfig } from '@hono/auth-js';

import images from './images';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

const routes = app.route('/images', images);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
