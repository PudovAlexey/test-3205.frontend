import { client } from '@/shared/api/jobs/requests';

/**
 * Configures the generated hey-api fetch client.
 *
 * The generated service URLs already include the `/api` prefix (the NestJS
 * controllers are `@Controller('api/jobs')` with no global prefix), so the
 * client `baseUrl` MUST stay empty — requests resolve to `/api/jobs`, which the
 * Vite dev proxy and the production nginx both forward to the backend.
 * Setting `baseUrl` to `/api` would double the prefix to `/api/api/jobs`.
 *
 * Import this module once for its side effect (done in `app/App.tsx`).
 */
client.setConfig({ ...client.getConfig(), baseUrl: '' });

export { client };
