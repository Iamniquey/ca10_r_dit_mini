import React from "react";
import Comment from "./Comment";

const Comments = ({ commentsObject }) => {
  if (!commentsObject) {
    console.log(commentsObject);
    return "";
  }

  const makeRepliesRecursively = (replies) => {
    if (replies.length < 1) {
      return null;
    }

    return replies.map((reply, index) => {
      return (
        <div className="indent-comment">
          <Comment key={index} comment={reply} />
          {makeRepliesRecursively(reply.replies)}
        </div>
      );
    });
  };

  return (
    <div>
      {commentsObject.map((comment, index) => {
        
        return (
          <div className="comment-block">
            <Comment key={index} comment={comment} />

            {makeRepliesRecursively(comment.replies)}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;

/** 
 * 
[
    {
        "name": "forexsam",
        "comment": "<div class=\"md\"><p>What are the requirements to be able to ask for feedback?</p>\n</div>",
        "replies": [
            {
                "name": "UnpoppableBalloons",
                "comment": "<div class=\"md\"><p>This subreddit uses a currency called lambda, it's a feedback-for-feedback system. If there are any questions about lambda that the FAQ doesn't answer above feel free to ask me.</p>\n</div>",
                "replies": []
            }
        ]
    },
    {
        "name": "filmmaker352",
        "comment": "<div class=\"md\"><p>It happened to me, I guess I need to put more feedback into the universe first</p>\n</div>",
        "replies": []
    },
    {
        "name": "thebohoberry",
        "comment": "<div class=\"md\"><p>It’s not letting me start a post at all. Not even a discussion. I am using the mobile web browser. </p>\n</div>",
        "replies": [
            {
                "name": "UnpoppableBalloons",
                "comment": "<div class=\"md\"><p>Like the post keeps getting taken down?</p>\n</div>",
                "replies": [
                    {
                        "name": "thebohoberry",
                        "comment": "<div class=\"md\"><p>No, it just doesn’t post at all. Maybe it’s because I am using the web browser.</p>\n</div>",
                        "replies": [
                            {
                                "name": "UnpoppableBalloons",
                                "comment": "<div class=\"md\"><p>If its an issue with reddit itself there is little to nothing I can do as a moderator.</p>\n</div>",
                                "replies": [
                                    {
                                        "name": "thebohoberry",
                                        "comment": "<div class=\"md\"><p>Ok! Thank you. </p>\n</div>",
                                        "replies": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "name": "RB_Timo",
        "comment": "<div class=\"md\"><p>Just a very short question: Would it be possible to change the background color a bit? I know, it's branding of sorts, but it's really, really bright and loud, and especially in the evenings it's quite unpleasant to read on here. Might just be me, though :D</p>\n</div>",
        "replies": [
            {
                "name": "UnpoppableBalloons",
                "comment": "<div class=\"md\"><p>I did change it to a darker red, lmk. This is the third comment we have gotten to change it so I have. Being honest I don't think a single member of the mod team actually sees the theme. Dark mode and old Reddit disable those by default.</p>\n</div>",
                "replies": [
                    {
                        "name": "RB_Timo",
                        "comment": "<div class=\"md\"><p>oooo much better :) Thank you, also for all other people too lazy to figure out darkmode and old reddit :D</p>\n</div>",
                        "replies": []
                    }
                ]
            }
        ]
    }
]

*/
