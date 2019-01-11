namespace Lyriquiz.Models
{
    public class Answer
    {
        
        public string Artist { get; set; }
        public string Photo { get; set; }
        public Song Song { get; set; }

        public Answer()
        {
            Song = new Song();
        }
    }

    public class Song
    {
        public string SongName { get; set; }
        public string SongId { get; set; }
        public string SongLyrics { get; set; }
        public Language Language { get; set; }

        public Song()
        {
            Language = new Language();
        }
    }


    public class Language
    {
        public string LanguageCode { get; set; }
        public string LanguageName { get; set; }
    }

}
