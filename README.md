# 👷 `worker-template` Hello World

A Cloudflare worker that performs the Oauth2 code grant based on the server id

#### Deploy

- Update the values in wrangler.toml
- Add the allowed guilds to the worker kv
- Run `wrangler publish`
- Enable `Requires OAuth2 Code Grant` and the redirect url to the worker

