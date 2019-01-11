namespace Lyriquiz.Models
{
    public class Question
    {
        public Answer Answer { get; set; }
        public RelatedArtist[] RelatedArtists { get; set; }

        public Question()
        {
            Answer = new Answer();
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
