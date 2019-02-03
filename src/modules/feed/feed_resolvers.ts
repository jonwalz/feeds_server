import fetch from "node-fetch";

const getFeed = async (_, args) => {
  let feed = []
  await fetch(`https://api.mixcloud.com/${args.username}/cloudcasts`)
    .then((resp) => resp.json())
    .then(async (json) => {
      feed = await transformFeedData(json)
    })

  return feed
};

const transformFeedData = (json) => {
  return json.data.reduce((acc, cloudcast) => {
    return cloudcast
      ? [
          ...acc,
          {
            url: cloudcast ? cloudcast.url : "",
            title: cloudcast ? cloudcast.name : "",
            created_time: cloudcast ? cloudcast.created_time : "",
            key: cloudcast ? cloudcast.key : "",
            embedUrl: cloudcast ? getEmbedString(cloudcast) : "",
          },
        ]
      : acc
  }, []);
};

const getEmbedString = async (cloudcast) => {
  let url
  await fetch(`https://api.mixcloud.com${cloudcast.key}embed-json/`)
    .then((resp) => resp.json())
    .then(async (json) => {
      url = json.html
    })
  return url
};

export default {
  getFeed,
};
