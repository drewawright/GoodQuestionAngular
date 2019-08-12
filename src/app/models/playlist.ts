export interface Playlist {
    OwnerId?: string;
    PlaylistId?: string;
    PlaylistName?: string;
    TracksUrl?: string;
    ImageUrl?: string;
    HasSongs: boolean;
    Danceability?: number;
    Energy?: number;
    Key?: number;
    Loudness?: number;
    Mode?: number;
    Speechiness?: number;
    Acousticness?: number;
    Instrumentalness?: number;
    Liveness?: number;
    Valence?: number;
    Tempo?: number;
    Duration_ms?: number;
    LastRefreshed?: Date;
    LastSyncedWithSpotify?: Date;
}