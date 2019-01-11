export class Question {
    Answer: Answer;
    RelatedArtists: RelatedArtist[];
}

export class RelatedArtist {
    Artist: string;
    Photo: string;
}

export class Answer {
    Artist: string;
    Photo: string;
    Song: Song;
}

export class Song {
    SongName: string;
    SongId: string;
    SongLyrics: string;
    Language: Language;
}

export class Language {
    LanguageCode: string;
    LanguageName: string;
}
// ALLT UNDER SKALL TAS BORT SEDAN
// export class Lyrics {
//     Result: Result;
// }

// export class Result {
//     Artist: Artist;
//     Track: Track;
//     Copyright: Copyright;
//     Probability: number;
//     Similarity: number;
// }

// export class Artist {
//     Name: string;
// }

// export class Track {
//     Name: string;
//     Text: string;
//     Lang: Lang;
// }

// export class Copyright {
//     Notice: string;
//     Artist: string;
//     Text: string;
// }

// export class Lang {
//     Code: string;
//     Name: string;
// }