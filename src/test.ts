/*
 * Welcome to Cloudflare Workers!
 *
 * - Run `pnpm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `pnpm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
export default {

	async fetch(request, env, ctx): Promise<Response> {
        const url = new URL(request.url)

        const value = url.searchParams.get('test') || null

        const data = {
            hello: "world",
            value,
            version: 1.0
        }
        return Response.json(data)
	}
} satisfies ExportedHandler<Env>
