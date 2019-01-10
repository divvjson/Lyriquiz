using Lyriquiz.Models;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Lyriquiz.Helpers
{
    public sealed class LyricsHelper
    {
        private static LyricsHelper instance = null;
        private static readonly object padlock = new object();
        private static HttpClient HttpClient { get; set; }
        private readonly string ApiUri = "https://orion.apiseeds.com/api/music/lyric/";
        private readonly string ApiKey = Keys.ApiKey;

        private LyricsHelper()
        {
        }

        public static LyricsHelper Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new LyricsHelper();
                    }
                    return instance;
                }
            }
        }

        public void InitHttpClient()
        {
            if (HttpClient == null)
            {
                HttpClient = new HttpClient
                {
                    Timeout = TimeSpan.FromSeconds(3),
                    BaseAddress = new Uri(ApiUri)
                };
                HttpClient.DefaultRequestHeaders.Accept.Clear();
                HttpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            }
        }

        public async Task<Lyrics> GetLyricsAsync(string artistName, string trackName)
        {
            try
            {
                HttpResponseMessage response = await HttpClient.GetAsync(artistName + "/" + trackName + "?apikey=" + ApiKey);

                if (response.IsSuccessStatusCode)
                {
                    return JsonConvert.DeserializeObject<Lyrics>(await response.Content.ReadAsStringAsync());
                }

                return null;

            } catch (Exception)

            {
                Console.WriteLine("The Lyrics API seems to be down...");
            }

            return null;
        }
    }
}
