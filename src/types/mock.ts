export interface Match {
    id: string;
    teamA: string;
    teamB: string;
    scoreA?: number;
    scoreB?: number;
    date: string;
    time: string;
    venue: string;
    isLive?: boolean;
    status: "upcoming" | "live" | "finished";
}

export interface PlayerRating {
    id: string;
    name: string;
    position: string;
    role: string;
    gPts: number;
    tPts: number;
    mp: number;
    w: number;
    d: number;
    rank: number;
    rating: number;
}

export interface Player {
    id: string;
    name: string;
    position: string;
    team: string;
    rating: number;
    status: string;
    goals: number;
    assists: number;
}
