using System.Collections.Generic;
using Lyriquiz.Helpers;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web.Models;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Lyriquiz.Models;
using System;
using System.Text.RegularExpressions;

namespace Lyriquiz.Controllers
{
    // Handles api-requests, generates answers and recommended artists from spotify.
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        private Question Question { get; set; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetAsync()
        {
            int attempt = 0;

            do
            {
                Question = new Question();

                attempt++;

                Question = await GenerateQuestionAsync();

                if (attempt > 5)
                {
                    return StatusCode(500, "Server was not able to obtain a question");
                }
            } while (Question == null);

            return Ok(JsonConvert.SerializeObject(Question));
        }

        // Generates a question for the API.
        private async Task<Question> GenerateQuestionAsync()
        {
            // Retrieve recommendations from Spotify

            Recommendations recommendations = GenerateRecommendations();

            if (recommendations == null)
            {
                return null;
            }

           

            // Retrieve photo of artist

            FullArtist artist = SpotifyHelper.Instance.Api.GetArtist(recommendations.Tracks[0].Artists[0].Id);

            // Retrieve lyrics from ApiSeeds
            Lyrics lyrics = await LyricsHelper.Instance.GetLyricsAsync(recommendations.Tracks[0].Artists[0].Name, recommendations.Tracks[0].Name);

            if (lyrics == null)
            {
                return null;
            }

            // Creates an instance of the correct quiz answer
            Answer answer = new Answer();
            answer.Artist = lyrics.Result.Artist.Name;
            answer.Photo = artist.Images[0].Url;
            answer.Song.SongName = recommendations.Tracks[0].Name;
            answer.Song.SongId = recommendations.Tracks[0].Id;
            answer.Song.SongLyrics = lyrics.Result.Track.Text;
            answer.Song.Language.LanguageCode = lyrics.Result.Track.Lang.Code;
            answer.Song.Language.LanguageName = lyrics.Result.Track.Lang.Name;
            Question.Answer = answer;


            // Retrieve related artists from Spotify
            SeveralArtists severalArtists = SpotifyHelper.Instance.Api.GetRelatedArtists(recommendations.Tracks[0].Artists[0].Id);

            int count = 0;
            foreach (var relatedArtist in severalArtists.Artists)
            {
                Question.RelatedArtists[count].Artist = relatedArtist.Name;
                Question.RelatedArtists[count].Photo = relatedArtist.Images[0].Url;

                count++;

                if (count == 3)
                {
                    break;
                }
            }

            if (Question.RelatedArtists.Length != 3)
            {
                return null;
            }

            return Question;
        }
        // Gets recommendations from spotify.
        private Recommendations GenerateRecommendations()
        {
            List<string> genreSeed = new List<string>
            {
                "rock",
                "pop"
            };

            TuneableTrack minValues = new TuneableTrack
            {
                Popularity = 70
            };

            TuneableTrack maxValues = new TuneableTrack
            {
                Popularity = 100
            };
            
            return SpotifyHelper.Instance.Api.GetRecommendations(genreSeed: genreSeed, limit: 1, market: "SE", min: minValues, max: maxValues);
        }
    }
}
