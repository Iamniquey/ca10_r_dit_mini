import he from "he";

function decodeHtml(str) {
  return he.decode(str).replace(/<a[^>]*>(.*?)<\/a>/gi, "$1");
}

export function getPostsFromJson(jsonObject) {
  let posts = [];
  const data = jsonObject.data.children;
  data.map((elem) => {
    const name = elem.data.author;
    const title = elem.data.title;
    const upvotes = elem.data.ups;
    const comments = elem.data.num_comments;
    const url = elem.data.url; //remove final forward slash
    let content = elem.data.selftext_html;
    if (!content) {
      return;
    }
    // get rid of links and convert to actual html
    let updatedContent = decodeHtml(decodeHtml(content));
    posts.push({
      name: name,
      title: title,
      upvotes: upvotes,
      comments: comments,
      url: url,
      content: updatedContent,
    });
  });
  return posts;
}

export function getCommentsArrayFromPostPageJson(postPageJson) {
  let commentArray = [];
  let deleted = 0;
  const listingWithComments = postPageJson[1].data.children;
  listingWithComments.map((elem) => {
    let repliesArray = [];

    const id = elem.data.id;
    const name = elem.data.author;
    if (!name || name === "[deleted]") {
      deleted++;
      return;
    }
    const comment = decodeHtml(decodeHtml(elem.data.body_html));

    const replies = elem.data.replies;
    console.log(replies);
    repliesArray = getRepliesRecursively(replies);
    if(!repliesArray){
      repliesArray = [];
    }

    commentArray.push({
      name: name,
      comment: comment,
      id: id,
      replies: repliesArray,
    });
  });

  return commentArray;
}

export function getDeletedCountFromJson(postPageJson) {
  let deleted = 0;
  const listingWithComments = postPageJson[1].data.children;
  listingWithComments.map((elem) => {
    const name = elem.data.author;
    if (name === "[deleted]") {
      deleted++;
    }
  });
  return deleted;
}

function getRepliesRecursively(object) {
  //base case
  if (!object) {
    return [];
  }
  //recursive call
  const repliesObject = object.data.children;
  return repliesObject.map((reply) => {
    console.log(reply);
    const id = reply.data.id;
    const replyName = reply.data.author;
    if (!replyName || replyName === "[deleted]") {
      return [];
    }
    const replyBody = decodeHtml(decodeHtml(reply.data.body_html));

    const replyObject = {
      id: id,
      name: replyName,
      comment: replyBody,
      replies: getRepliesRecursively(reply.data.replies), // Recursive call to get nested replies
    };

    return replyObject;
  });
}

export function filterPosts(postsArray, search) {
  let newArr = postsArray;
  if (!search) {
    return newArr;
  }
  newArr = newArr.filter((elem) => {
    const matchName = elem.name.toLowerCase().includes(search.toLowerCase());
    const matchTitle = elem.title.toLowerCase().includes(search.toLowerCase());
    const matchContent = elem.content
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchName || matchTitle || matchContent;
  });
  return newArr;
}

export let callTracker = [];

export function getCalls() {
  return callTracker;
}

export function trackApiCallAllowance() {
  // tracking calls
  const now = Date.now();

  //localStorage.clear();

  //retrieve timestamps from localstorage
  const callTimestamps = JSON.parse(localStorage.getItem("callTimestamps"));
  if (!callTimestamps) {
    callTimestamps = [];
  }
  callTracker = callTimestamps;

  // Remove timestamps older than 1 minute
  while (callTimestamps.length > 0 && now - callTimestamps[0] > 60000) {
    callTimestamps.shift();
  }

  if (callTimestamps.length < 10) {
    // Store timestamp
    callTimestamps.push(now);

    //save to localStorage
    localStorage.setItem("callTimestamps", JSON.stringify(callTimestamps));
    return true;
  } else {
    return false;
  }
}
