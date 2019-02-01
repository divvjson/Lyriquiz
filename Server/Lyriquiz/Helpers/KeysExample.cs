using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lyriquiz.Helpers
{
    // Holds keys for the different APIs
    // COPY and PASTE this file to the same directory
    // Add your API keys
    // Rename it to Keys.cs
    public static class KeysExample
    {   
        // https://developer.spotify.com/
        public static string ClientId { get; set; } = "SPOTIFY CLIENT ID GOES HERE";

        // https://developer.spotify.com/
        public static string ClientSecret { get; set; } = "SPOTIFY CLIENT SECRET GOES HERE";

        // https://apiseeds.com/documentation/lyrics
        public static string ApiKey { get; set; } = "APISEEDS CLIENT API KEY GOES HERE";
    }
}
