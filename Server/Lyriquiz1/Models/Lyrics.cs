namespace Lyriquiz1.Models
{
    public class Lyrics
    {
        public Result Result { get; set; }
    }

    public class Result
    {
        public Artist Artist { get; set; }
        public Track Track { get; set; }
        public Copyright Copyright { get; set; }
        public double Probability { get; set; }
        public double Similarity { get; set; }
    }

    public class Artist
    {
        public string Name { get; set; }
    }

    public class Track
    {
        public string Name { get; set; }
        public string Text { get; set; }
        public Lang Lang { get; set; }
    }

    public class Lang
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }

    public class Copyright
    {
        public string Notice { get; set; }
        public string Artist { get; set; }
        public string Text { get; set; }
    }
}
