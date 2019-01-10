export class Question {
    Artist: string;
    TrackId: string;
    Track: string;
    Photo: string;
    RelatedArtists: RelatedArtist[];
    Lyrics: Lyrics;
}

export class RelatedArtist {
    Artist: string;
    Photo: string;
}

export class Lyrics {
    Result: Result;
}

export class Result {
    Artist: Artist;
    Track: Track;
    Copyright: Copyright;
    Probability: number;
    Similarity: number;
}

export class Artist {
    Name: string;
}

export class Track {
    Name: string;
    Text: string;
    Lang: Lang;
}

export class Copyright {
    Notice: string;
    Artist: string;
    Text: string;
}

export class Lang {
    Code: string;
    Name: string;
}