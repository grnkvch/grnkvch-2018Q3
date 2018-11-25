/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
export default class YouTubeRequest {
  constructor() {
    this.resultCollection = null;
    this.nextPageToken = null;
  }

  search(request) {
    let requestUrl = null;
    if (!request && this.nextPageToken) {
      requestUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAC4vO7bJ2xG4KXEXSX6fRF4Oer5rk6Clc&type=video&part=snippet&maxResults=20&q=${request}&pageToken=${this.nextPageToken}`;
    } else requestUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAC4vO7bJ2xG4KXEXSX6fRF4Oer5rk6Clc&type=video&part=snippet&maxResults=20&q=${request}`;
    return fetch(requestUrl)
      .then(response => response.json())
      .then((data) => {
        this.nextPageToken = data.nextPageToken;
        const idList = data.items.map(item => item.id.videoId).join();
        return fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${idList}&key=AIzaSyAC4vO7bJ2xG4KXEXSX6fRF4Oer5rk6Clc`);
      })
      .then(response => response.json())
      .then(data => this.parseResult(data));
  }

  parseResult(data) {
    const resultsList = [];
    const length = data.items.length;
    for (let i = 0; i < length; i++) {
      const searchResult = data.items[i];
      const item = {};
      item.viewCount = data.items[i].statistics.viewCount;
      item.title = searchResult.snippet.title;
      item.author = searchResult.snippet.channelTitle;
      item.thumbnailUrl = searchResult.snippet.thumbnails.medium.url;
      item.publishedAt = new Date(Date.parse(searchResult.snippet.publishedAt));
      item.description = searchResult.snippet.description;
      item.url = `https://www.youtube.com/watch?v=${searchResult.id}`;
      resultsList.push(item);
    }
    if (this.resultCollection) this.resultCollection.concat(resultsList);
    else this.resultCollection = resultsList.slice();
    return this.resultCollection;
  }

  free() {
    this.resultCollection = null;
    this.nextPageToken = null;
  }
}
