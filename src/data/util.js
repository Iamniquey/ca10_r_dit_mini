export function getPostsFromJson(jsonObject) {
  let posts = [];
  const data = jsonObject.data.children;
  data.map((elem) => {
    const name = elem.data.author;
    const title = elem.data.title;
    const upvotes = elem.data.ups;
    const comments = elem.data.num_comments;
    const permalink = elem.data.permalink;
    const content = elem.data.selftext;
    posts.push({
      name: name,
      title: title,
      upvotes: upvotes,
      comments: comments,
      permalink: permalink,
      content: content,
    });
  });
  return posts;
}
