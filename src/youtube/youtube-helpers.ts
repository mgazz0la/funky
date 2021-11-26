import ytdl = require("ytdl-core");
import { Readable } from "stream";

export class YoutubeHelpers {
  public static audioStreamForUrl(url: string): Readable {
    return ytdl(url, { filter: "audioonly" });
  }
}
