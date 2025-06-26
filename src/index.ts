import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import createSupabase from "./supabase";

type Env = {
	SUPABASE_URL: string;
	SUPABASE_PUBLISHABLE_KEY: string;
};

// Define our MCP agent class, which will hold the tools and server logic.
export class FantasyCricketAgent extends McpAgent<{}, Env> {
	server = new McpServer({
		name: "Fantasy Cricket Strategy Agent",
		version: "1.0.0",
		requireAuth: false,
	});

	env: Env;

	constructor(state: any, env: Env) {
		super(state, env);
		this.env = env;
	}

	async init() {
		const supabase = createSupabase(this.env);

		// Tool to list all available tournaments
		this.server.tool(
			"list_tournaments",
			"Returns a list of all available tournaments",
			{},
			async () => {
				console.log("list_tournaments called");
				const { data, error } = await supabase
					.from('tournaments')
					.select('id, name, start_date, end_date');
				
				console.log("list_tournaments data:", data);
				console.log("list_tournaments error:", error);
				
				if (error) {
					throw new Error(error.message);
				}
				
				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(data, null, 2)
						}
					]
				};
			}
		);

		// Tool to find matches by tournament ID
		this.server.tool(
			"find_matches",
			"Gets all matches for a specific tournament",
			{
				tournament_id: z.string().describe("Tournament ID to get matches for")
			},
			async (args: any) => {
				const { data, error } = await supabase
					.from("matches")
					.select("*")
					.eq("tournament_id", args.tournament_id);
				
				if (error) {
					throw new Error(error.message);
				}
				
				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(data, null, 2)
						}
					]
				};
			}
		);

		// Tool to find players
		this.server.tool(
			"find_players", 
			"Finds players by match ID, with optional filters",
			{
				match_id: z.string().describe("Match ID to find players for"),
				player_name: z.string().optional().describe("Player name to search for (optional)"),
				role: z.string().optional().describe("Player role to filter by (optional)")
			},
			async (args: any) => {
				let query = supabase.from("players").select("*");
				if (args.player_name) {
					query = query.ilike("name", `%${args.player_name}%`);
				}
				if (args.role) {
					query = query.eq("role", args.role);
				}
				const { data, error } = await query;
				if (error) {
					throw new Error(error.message);
				}
				
				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(data, null, 2)
						}
					]
				};
			}
		);
	}
}

// The default export handles the routing for different MCP connection types.
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		// Route for Server-Sent Events (SSE) connections, used by many clients.
		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			return FantasyCricketAgent.serveSSE("/sse").fetch(request, env, ctx);
		}

		// Route for standard MCP connections.
		if (url.pathname === "/mcp") {
			return FantasyCricketAgent.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	}
};
