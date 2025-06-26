export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      tournaments: {
        Row: {
          created_at: string
          creator_id: string | null
          description: string | null
          end_date: string
          id: string
          is_active: boolean | null
          location: string | null
          name: string
          start_date: string
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          description?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          name: string
          start_date: string
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          description?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          name?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournaments_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      matches: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          max_overs: number | null
          result: Json | null
          result_description: string | null
          result_status: string | null
          result_type: string | null
          start_time: string
          status: string
          team1_id: string
          team2_id: string
          toss_decision: string | null
          toss_winner_team_id: string | null
          tournament_id: string
          updated_at: string | null
          venue: string
          win_margin: number | null
          winner_team_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          max_overs?: number | null
          result?: Json | null
          result_description?: string | null
          result_status?: string | null
          result_type?: string | null
          start_time: string
          status: string
          team1_id: string
          team2_id: string
          toss_decision?: string | null
          toss_winner_team_id?: string | null
          tournament_id: string
          updated_at?: string | null
          venue: string
          win_margin?: number | null
          winner_team_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          max_overs?: number | null
          result?: Json | null
          result_description?: string | null
          result_status?: string | null
          result_type?: string | null
          start_time?: string
          status?: string
          team1_id?: string
          team2_id?: string
          toss_decision?: string | null
          toss_winner_team_id?: string | null
          tournament_id?: string
          updated_at?: string | null
          venue?: string
          win_margin?: number | null
          winner_team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_team1_id_fkey"
            columns: ["team1_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team2_id_fkey"
            columns: ["team2_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_toss_winner_team_id_fkey"
            columns: ["toss_winner_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_team_id_fkey"
            columns: ["winner_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          mobile: string | null
          name: string
          role: string
          stats: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          mobile?: string | null
          name: string
          role: string
          stats?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          mobile?: string | null
          name?: string
          role?: string
          stats?: Json | null
        }
        Relationships: []
      }
      team_players: {
        Row: {
          created_at: string
          id: string
          player_id: string
          team_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          player_id: string
          team_id: string
        }
        Update: {
          created_at?: string
          id?: string
          player_id?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
