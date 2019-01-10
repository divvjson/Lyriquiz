namespace Lyriquiz1.Models
{
    public class Question
    {
        public string Artist { get; set; }
        public string TrackId { get; set; }
        public string Track { get; set; }
        public string Photo { get; set; }
        public RelatedArtist[] RelatedArtists { get; set; }
        public Lyrics Lyrics { get; set; }

        public Question()
        {
            RelatedArtists = new RelatedArtist[3];

            for (int i = 0; i < RelatedArtists.Length; i++)
            {
                RelatedArtists[i] = new RelatedArtist();
            }
        }  
    }

    public class RelatedArtist
    {
        public string Artist { get; set; }
        public string Photo { get; set; }
    }
}
