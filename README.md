# Remote MCP Server

A remote Model Context Protocol (MCP) server built for [playz.one](http://playz.one/) using Cloudflare Workers.

## Setup

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.dev.vars` file with required environment variables:
   ```bash
   SUPABASE_URL=your_supabase_url
   SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```

3. Run locally:
   ```bash
   npm run dev
   ```

### Deployment
Simple deployment to Cloudflare Workers for remote MCP functionality.

For detailed setup instructions, see the [Cloudflare Workers documentation](https://blog.cloudflare.com/remote-model-context-protocol-servers-mcp/).

## Testing
Test the server using the MCP inspector:
```bash
npx @modelcontextprotocol/inspector
```