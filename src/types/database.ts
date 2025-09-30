export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "13.0.5";
    };
    public: {
        Tables: {
            goals: {
                Row: {
                    assist_id: string | null;
                    created_at: string;
                    id: string;
                    match_id: string;
                    minute: number;
                    scorer_id: string;
                };
                Insert: {
                    assist_id?: string | null;
                    created_at?: string;
                    id?: string;
                    match_id: string;
                    minute: number;
                    scorer_id: string;
                };
                Update: {
                    assist_id?: string | null;
                    created_at?: string;
                    id?: string;
                    match_id?: string;
                    minute?: number;
                    scorer_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "goals_match_id_fkey";
                        columns: ["match_id"];
                        isOneToOne: false;
                        referencedRelation: "matches";
                        referencedColumns: ["id"];
                    }
                ];
            };
            group_memberships: {
                Row: {
                    group_id: string;
                    id: string;
                    is_admin: boolean;
                    joined_at: string;
                    user_id: string;
                };
                Insert: {
                    group_id: string;
                    id?: string;
                    is_admin?: boolean;
                    joined_at?: string;
                    user_id: string;
                };
                Update: {
                    group_id?: string;
                    id?: string;
                    is_admin?: boolean;
                    joined_at?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "group_memberships_group_id_fkey";
                        columns: ["group_id"];
                        isOneToOne: false;
                        referencedRelation: "groups";
                        referencedColumns: ["id"];
                    }
                ];
            };
            groups: {
                Row: {
                    code: string;
                    created_at: string;
                    creator_id: string;
                    description: string | null;
                    id: string;
                    name: string;
                    updated_at: string;
                };
                Insert: {
                    code: string;
                    created_at?: string;
                    creator_id: string;
                    description?: string | null;
                    id?: string;
                    name: string;
                    updated_at?: string;
                };
                Update: {
                    code?: string;
                    created_at?: string;
                    creator_id?: string;
                    description?: string | null;
                    id?: string;
                    name?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            match_participants: {
                Row: {
                    created_at: string;
                    id: string;
                    is_playing: boolean;
                    match_id: string;
                    position:
                        | Database["public"]["Enums"]["player_position"]
                        | null;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    is_playing?: boolean;
                    match_id: string;
                    position?:
                        | Database["public"]["Enums"]["player_position"]
                        | null;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    is_playing?: boolean;
                    match_id?: string;
                    position?:
                        | Database["public"]["Enums"]["player_position"]
                        | null;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "match_participants_match_id_fkey";
                        columns: ["match_id"];
                        isOneToOne: false;
                        referencedRelation: "matches";
                        referencedColumns: ["id"];
                    }
                ];
            };
            match_votes: {
                Row: {
                    created_at: string;
                    id: string;
                    match_id: string;
                    player_id: string;
                    voter_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    match_id: string;
                    player_id: string;
                    voter_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    match_id?: string;
                    player_id?: string;
                    voter_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "match_votes_match_id_fkey";
                        columns: ["match_id"];
                        isOneToOne: false;
                        referencedRelation: "matches";
                        referencedColumns: ["id"];
                    }
                ];
            };
            matches: {
                Row: {
                    created_at: string;
                    creator_id: string;
                    description: string | null;
                    group_id: string;
                    id: string;
                    is_completed: boolean;
                    man_of_the_match_id: string | null;
                    match_date: string;
                    title: string;
                    updated_at: string;
                    venue: string | null;
                };
                Insert: {
                    created_at?: string;
                    creator_id: string;
                    description?: string | null;
                    group_id: string;
                    id?: string;
                    is_completed?: boolean;
                    man_of_the_match_id?: string | null;
                    match_date: string;
                    title: string;
                    updated_at?: string;
                    venue?: string | null;
                };
                Update: {
                    created_at?: string;
                    creator_id?: string;
                    description?: string | null;
                    group_id?: string;
                    id?: string;
                    is_completed?: boolean;
                    man_of_the_match_id?: string | null;
                    match_date?: string;
                    title?: string;
                    updated_at?: string;
                    venue?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "matches_group_id_fkey";
                        columns: ["group_id"];
                        isOneToOne: false;
                        referencedRelation: "groups";
                        referencedColumns: ["id"];
                    }
                ];
            };
            player_stats: {
                Row: {
                    assists: number;
                    created_at: string;
                    goals: number;
                    group_id: string;
                    id: string;
                    matches_played: number;
                    points: number;
                    rating: number;
                    updated_at: string;
                    user_id: string;
                };
                Insert: {
                    assists?: number;
                    created_at?: string;
                    goals?: number;
                    group_id: string;
                    id?: string;
                    matches_played?: number;
                    points?: number;
                    rating?: number;
                    updated_at?: string;
                    user_id: string;
                };
                Update: {
                    assists?: number;
                    created_at?: string;
                    goals?: number;
                    group_id?: string;
                    id?: string;
                    matches_played?: number;
                    points?: number;
                    rating?: number;
                    updated_at?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "player_stats_group_id_fkey";
                        columns: ["group_id"];
                        isOneToOne: false;
                        referencedRelation: "groups";
                        referencedColumns: ["id"];
                    }
                ];
            };
            profiles: {
                Row: {
                    assist: number | null;
                    bio: string | null;
                    country: string | null;
                    county_state_city: string | null;
                    created_at: string;
                    dob: string | null;
                    first_name: string | null;
                    foot: Database["public"]["Enums"]["foot"] | null;
                    goals: number;
                    height: number | null;
                    id: string;
                    last_name: string | null;
                    matches_played: number;
                    matches_won: number | null;
                    other_name: string | null;
                    points: number;
                    position: string | null;
                    potm: number;
                    rating: number;
                    role: Database["public"]["Enums"]["user_role"];
                    sex: Database["public"]["Enums"]["sex"] | null;
                    updated_at: string;
                    weight: number | null;
                    profile_url: string | null;
                };
                Insert: {
                    assist?: number | null;
                    bio?: string | null;
                    country?: string | null;
                    county_state_city?: string | null;
                    created_at?: string;
                    dob?: string | null;
                    first_name?: string | null;
                    foot?: Database["public"]["Enums"]["foot"] | null;
                    goals?: number;
                    height?: number | null;
                    id: string;
                    last_name?: string | null;
                    matches_played?: number;
                    matches_won?: number | null;
                    other_name?: string | null;
                    points?: number;
                    position?: string | null;
                    potm?: number;
                    rating?: number;
                    role?: Database["public"]["Enums"]["user_role"];
                    sex?: Database["public"]["Enums"]["sex"] | null;
                    updated_at?: string;
                    weight?: number | null;
                    profile_url: string | null;
                };
                Update: {
                    assist?: number | null;
                    bio?: string | null;
                    country?: string | null;
                    county_state_city?: string | null;
                    created_at?: string;
                    dob?: string | null;
                    first_name?: string | null;
                    foot?: Database["public"]["Enums"]["foot"] | null;
                    goals?: number;
                    height?: number | null;
                    id?: string;
                    last_name?: string | null;
                    matches_played?: number;
                    matches_won?: number | null;
                    other_name?: string | null;
                    points?: number;
                    position?: string | null;
                    potm?: number;
                    rating?: number;
                    role?: Database["public"]["Enums"]["user_role"];
                    sex?: Database["public"]["Enums"]["sex"] | null;
                    updated_at?: string;
                    weight?: number | null;
                    profile_url?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            generate_group_code: {
                Args: Record<PropertyKey, never>;
                Returns: string;
            };
        };
        Enums: {
            foot: "left" | "right" | "both";
            player_position:
                | "goalkeeper"
                | "defender"
                | "midfielder"
                | "forward";
            sex: "male" | "female";
            user_role: "admin" | "user";
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
    keyof Database,
    "public"
>];

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
          DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
          DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
        | keyof DefaultSchema["Enums"]
        | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema["CompositeTypes"]
        | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
    public: {
        Enums: {
            foot: ["left", "right", "both"],
            player_position: [
                "goalkeeper",
                "defender",
                "midfielder",
                "forward",
            ],
            sex: ["male", "female"],
            user_role: ["admin", "user"],
        },
    },
} as const;
