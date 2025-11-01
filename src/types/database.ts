export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      goals: {
        Row: {
          assist_id: string | null
          created_at: string
          id: string
          match_id: string
          minute: number | null
          scorer_id: string
        }
        Insert: {
          assist_id?: string | null
          created_at?: string
          id?: string
          match_id: string
          minute?: number | null
          scorer_id: string
        }
        Update: {
          assist_id?: string | null
          created_at?: string
          id?: string
          match_id?: string
          minute?: number | null
          scorer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_assist_id_fkey1"
            columns: ["assist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goals_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goals_scorer_id_fkey1"
            columns: ["scorer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_join_requests: {
        Row: {
          created_at: string | null
          group_id: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          group_id: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          group_id?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_join_requests_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_memberships: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_memberships_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_teams: {
        Row: {
          color: string
          created_at: string | null
          deleted_at: string | null
          group_id: string
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          color?: string
          created_at?: string | null
          deleted_at?: string | null
          group_id: string
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          color?: string
          created_at?: string | null
          deleted_at?: string | null
          group_id?: string
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_teams_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          background_color: string | null
          badge: string | null
          country: string | null
          created_at: string
          creator_id: string
          description: string | null
          foreground_color: string | null
          id: string
          join_code: string
          name: string
          picture_url: string | null
          updated_at: string
        }
        Insert: {
          background_color?: string | null
          badge?: string | null
          country?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          foreground_color?: string | null
          id?: string
          join_code: string
          name: string
          picture_url?: string | null
          updated_at?: string
        }
        Update: {
          background_color?: string | null
          badge?: string | null
          country?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          foreground_color?: string | null
          id?: string
          join_code?: string
          name?: string
          picture_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      match_participants: {
        Row: {
          created_at: string
          id: string
          is_playing: boolean
          match_id: string
          position: Database["public"]["Enums"]["player_position"] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_playing?: boolean
          match_id: string
          position?: Database["public"]["Enums"]["player_position"] | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_playing?: boolean
          match_id?: string
          position?: Database["public"]["Enums"]["player_position"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_participants_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      match_responses: {
        Row: {
          availability: boolean | null
          created_at: string | null
          id: string
          match_id: string | null
          payment_made: boolean | null
          status: string | null
          team_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          availability?: boolean | null
          created_at?: string | null
          id?: string
          match_id?: string | null
          payment_made?: boolean | null
          status?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          availability?: boolean | null
          created_at?: string | null
          id?: string
          match_id?: string | null
          payment_made?: boolean | null
          status?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_responses_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_responses_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "group_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      match_votes: {
        Row: {
          created_at: string
          id: string
          match_id: string
          player_id: string
          voter_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          match_id: string
          player_id: string
          voter_id: string
        }
        Update: {
          created_at?: string
          id?: string
          match_id?: string
          player_id?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_votes_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          a_side: number | null
          created_at: string
          creator_id: string
          description: string | null
          group_id: string
          id: string
          match_date: string
          match_time: string | null
          potm_id: string | null
          status: Database["public"]["Enums"]["match_status"]
          teamA_id: string
          teamA_score: number | null
          teamB_id: string
          teamB_score: number
          title: string | null
          updated_at: string
          venue: string | null
        }
        Insert: {
          a_side?: number | null
          created_at?: string
          creator_id: string
          description?: string | null
          group_id: string
          id?: string
          match_date: string
          match_time?: string | null
          potm_id?: string | null
          status?: Database["public"]["Enums"]["match_status"]
          teamA_id: string
          teamA_score?: number | null
          teamB_id: string
          teamB_score?: number
          title?: string | null
          updated_at?: string
          venue?: string | null
        }
        Update: {
          a_side?: number | null
          created_at?: string
          creator_id?: string
          description?: string | null
          group_id?: string
          id?: string
          match_date?: string
          match_time?: string | null
          potm_id?: string | null
          status?: Database["public"]["Enums"]["match_status"]
          teamA_id?: string
          teamA_score?: number | null
          teamB_id?: string
          teamB_score?: number
          title?: string | null
          updated_at?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_teamA_id_fkey"
            columns: ["teamA_id"]
            isOneToOne: false
            referencedRelation: "group_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_teamB_id_fkey"
            columns: ["teamB_id"]
            isOneToOne: false
            referencedRelation: "group_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          group_id: string | null
          id: string
          link: string | null
          message: string | null
          read: boolean
          title: string | null
          type: Database["public"]["Enums"]["notification_type"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          group_id?: string | null
          id?: string
          link?: string | null
          message?: string | null
          read?: boolean
          title?: string | null
          type?: Database["public"]["Enums"]["notification_type"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          group_id?: string | null
          id?: string
          link?: string | null
          message?: string | null
          read?: boolean
          title?: string | null
          type?: Database["public"]["Enums"]["notification_type"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      player_group_stats: {
        Row: {
          assists: number | null
          created_at: string | null
          goals: number | null
          id: string
          matches_lost: number | null
          matches_played: number | null
          matches_won: number | null
          membership_id: string | null
          points: number | null
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          assists?: number | null
          created_at?: string | null
          goals?: number | null
          id?: string
          matches_lost?: number | null
          matches_played?: number | null
          matches_won?: number | null
          membership_id?: string | null
          points?: number | null
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          assists?: number | null
          created_at?: string | null
          goals?: number | null
          id?: string
          matches_lost?: number | null
          matches_played?: number | null
          matches_won?: number | null
          membership_id?: string | null
          points?: number | null
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_group_stats_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: true
            referencedRelation: "group_memberships"
            referencedColumns: ["id"]
          },
        ]
      }
      player_team_memberships: {
        Row: {
          created_at: string | null
          id: string
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_team_memberships_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "group_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          assist: number | null
          bio: string | null
          country: string | null
          county_state_city: string | null
          created_at: string
          dob: string | null
          foot: Database["public"]["Enums"]["foot"] | null
          full_name: string | null
          goals: number
          height: number | null
          id: string
          matches_played: number
          matches_won: number
          measurement_system: Database["public"]["Enums"]["measurement_type"]
          other_name: string | null
          points: number
          position: string | null
          potm: number
          profile_url: string | null
          rating: number
          role: Database["public"]["Enums"]["user_role"]
          sex: Database["public"]["Enums"]["sex"] | null
          updated_at: string
          username: string | null
          weight: number | null
        }
        Insert: {
          assist?: number | null
          bio?: string | null
          country?: string | null
          county_state_city?: string | null
          created_at?: string
          dob?: string | null
          foot?: Database["public"]["Enums"]["foot"] | null
          full_name?: string | null
          goals?: number
          height?: number | null
          id: string
          matches_played?: number
          matches_won?: number
          measurement_system?: Database["public"]["Enums"]["measurement_type"]
          other_name?: string | null
          points?: number
          position?: string | null
          potm?: number
          profile_url?: string | null
          rating?: number
          role?: Database["public"]["Enums"]["user_role"]
          sex?: Database["public"]["Enums"]["sex"] | null
          updated_at?: string
          username?: string | null
          weight?: number | null
        }
        Update: {
          assist?: number | null
          bio?: string | null
          country?: string | null
          county_state_city?: string | null
          created_at?: string
          dob?: string | null
          foot?: Database["public"]["Enums"]["foot"] | null
          full_name?: string | null
          goals?: number
          height?: number | null
          id?: string
          matches_played?: number
          matches_won?: number
          measurement_system?: Database["public"]["Enums"]["measurement_type"]
          other_name?: string | null
          points?: number
          position?: string | null
          potm?: number
          profile_url?: string | null
          rating?: number
          role?: Database["public"]["Enums"]["user_role"]
          sex?: Database["public"]["Enums"]["sex"] | null
          updated_at?: string
          username?: string | null
          weight?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_group: {
        Args: { p_group_id: string; p_user_id: string }
        Returns: boolean
      }
      generate_group_code: { Args: never; Returns: string }
      is_user_in_group: { Args: { g: string; u: string }; Returns: boolean }
    }
    Enums: {
      foot: "left" | "right" | "both"
      match_response_status: "pending" | "join" | "decline"
      match_status:
        | "pending"
        | "confirmed"
        | "ended"
        | "cancelled"
        | "completed"
      measurement_type: "si" | "us"
      notification_type: "match" | "group" | "user" | "general"
      player_position: "goalkeeper" | "defender" | "midfielder" | "forward"
      sex: "male" | "female"
      user_role: "admin" | "user" | "owner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      foot: ["left", "right", "both"],
      match_response_status: ["pending", "join", "decline"],
      match_status: ["pending", "confirmed", "ended", "cancelled", "completed"],
      measurement_type: ["si", "us"],
      notification_type: ["match", "group", "user", "general"],
      player_position: ["goalkeeper", "defender", "midfielder", "forward"],
      sex: ["male", "female"],
      user_role: ["admin", "user", "owner"],
    },
  },
} as const
