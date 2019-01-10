using SpotifyAPI.Web;
using SpotifyAPI.Web.Auth;
using SpotifyAPI.Web.Models;
using System.Threading.Tasks;

namespace Lyriquiz.Helpers
{
    public sealed class SpotifyHelper
    {
        private static SpotifyHelper instance = null;
        private static readonly object padlock = new object();
        public SpotifyWebAPI Api { get; private set; }
        private string ClientId { get; set; } = Keys.ClientId;
        private string ClientSecret { get; set; } = Keys.ClientSecret;

        private SpotifyHelper()
        {
        }

        public static SpotifyHelper Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new SpotifyHelper();
                    }
                    return instance;
                }
            }
        }

        public async void InitApiAsync()
        {
            if (Api == null)
            {
                CredentialsAuth auth = new CredentialsAuth(ClientId, ClientSecret);

                Token token = await auth.GetToken();

                Api = new SpotifyWebAPI
                {
                    AccessToken = token.AccessToken,
                    TokenType = token.TokenType
                };
            }
        }
    }
}
