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

    const name = elem.data.author;
    if (name === "[deleted]") {
      deleted++;
      return;
    }
    const comment = decodeHtml(decodeHtml(elem.data.body_html));

    const replies = elem.data.replies;

    repliesArray = getRepliesRecursively(replies);

    commentArray.push({ name: name, comment: comment, replies: repliesArray });
  });

  return commentArray;
}

function getRepliesRecursively(object) {
  //base case
  if (!object) {
    return [];
  }
  //recursive call
  const repliesObject = object.data.children;
  return repliesObject.map((reply) => {
    const replyName = reply.data.author;
    const replyBody = decodeHtml(decodeHtml(reply.data.body_html));

    const replyObject = {
      name: replyName,
      comment: replyBody,
      replies: getRepliesRecursively(reply.data.replies), // Recursive call to get nested replies
    };

    return replyObject;
  });
}
