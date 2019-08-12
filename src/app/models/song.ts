export interface song {
    Name?:  string;
    SongId?: string;
    Artists?: string;
    AlbumName?: string;
    ImageUrl?: string;
    PlayerUrl?: string;
    HasAudioFeatures: boolean;
    LastRefreshed: Date;
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
}