export interface Config {
    aftership:        Aftership;
    sonos:            Sonos;
    homeassistant:    Homeassistant;
    homeserver:       Homeserver;
    weather:          Weather;
    google_calendar:  GoogleCalendar;
    public_transport: PublicTransport;
    spotify:          Spotify;
}

export interface Aftership {
    api_key: string;
}

export interface GoogleCalendar {
    client_id:      string;
    client_secret:  string;
    redirect_uri:   string;
    api_key:        string;
    scope:          string;
    discovery_docs: string[];
}

export interface Homeassistant {
    hassUrl:              string;
    life_time_token_raik: string;
}

export interface Homeserver {
    url: string;
}

export interface PublicTransport {
    websocketUrl: string;
    home_address: HomeAddress;
}

export interface HomeAddress {
    longitude: number;
    latitude:  number;
    distance:  number;
}

export interface Sonos {
    websocket_url: string;
    rest_url:      string;
}

export interface Spotify {
    client_id:     string;
    client_secret: string;
    user_id:       string;
}

export interface Weather {
    open_weather_url: string;
    api_key:          string;
}
