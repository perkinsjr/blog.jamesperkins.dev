---
author: James Perkins
authorTwitter: james_r_perkins
date: "2021-04-24"
title: "Retrieve your last 10 YouTube Videos"
description: "I will show how to retrieve the last 10 videos from YouTube, so people never have to leave your digital garden. I have been retrieving the data from YouTube for a while, I have a live stat update on my site so you can see the latest subscriber and view count"
image: "https://res.cloudinary.com/dub20ptvt/image/upload/v1619300077/jsconfig_for_faster_NextJS_development_1_d14bul.png"
category: tutorial
tags: 
- "coding" 
- "youtube api"
- "tutorial"
---

I have been retrieving the data from YouTube for a while, I have a live stat update on my site so you can see the latest subscriber and view count. 

I also have a static list of videos that use the power of nextjs [incremental static generation](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration) to give people the latest updates. 

Google doesn't make it easy to follow their documentation which is typical of a Google-based project in my opinion. 

### What API and how to get access?

Google offers plenty of APIs but to retrieve the YouTube videos or stats you can use the [YouTube API V3 ](https://developers.google.com/youtube/v3). To gain access you will need to signup for a google cloud console account, preferably with your Google account that is attached to your YouTube channel. 

Once you have signed up select the API & Services from the Hamburger menu and you should see a screen similar to the following 

![ApiV3 option](https://res.cloudinary.com/dub20ptvt/image/upload/v1619291211/YouTube_API_and_Services_dashboard_qoctxa.png)

Now select the `ENABLE APIS AND SERVICES` and search for ` YouTube Data API v3`  and select the enable button. 

![API enabled](https://res.cloudinary.com/dub20ptvt/image/upload/v1619291460/enabled_API_fsbgrw.png)

### Creating an API Key ready to be used with your channel. 

One of the key elements to creating our requests is an API key that we can use for our channel. 

From the screen where you just enabled the API select manage and you will be brought to the following screen.

![manage api screen](https://res.cloudinary.com/dub20ptvt/image/upload/v1619292142/API_manage_screen_wkulln.png)

Select Credentials on the left-hand side and then at the top Create Credentials and select API Key and Google will produce an API Key so go ahead and save that somewhere. 

### Getting the playlist_id

The easiest way to use your channel playlist, channel playlist is how YouTube shows your visitors all of your videos. 

To acquire this `playlist_id` go to your YouTube Channel.

1. Select videos
2. Select Play all
3. Then on the right-hand side click the name which should be Uploads from {channel name}
4. in the URL copy the query string after the `list=`

### Making a request

So it's important to understand that YouTube has many different API options to use. I am going to show you how to request the latest 10 videos from your channel.  
We have all the important parts so let us make a request. I will show you how to do it with fetch and you can modify it as needed! 

```javascript

const REQUEST_URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=10`;

const response = await fetch(REQUEST_URL);
const results = await response.json();

console.log(results.items);
```

This request will return the 10 objects which contain the video details. You will need to map over the data and pull out the `video.snippet.resourceId.videoId` which contains the `video_id` that you can use to play it with 

`https://www.youtube.com/watch?v={video.snippet.resourceId.videoId}`
