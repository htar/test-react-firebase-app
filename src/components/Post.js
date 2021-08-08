import React from "react";
import FirestoreService from "services/FirebaseService";

import moment from "moment";

const Post = (post = null) => {
  const { id, title, content, user = null, createdAt, stars, comments } = post;
  const date = moment(createdAt, "DD/MM/YYYY").format("DD/MM/YYYY");

  const onRemovePost = () => {
    FirestoreService.deletePost(id, () => console.log("post was removed"));
  };
  const star = () => {
    FirestoreService.updatePost(id, { stars: stars + 1 }, () =>
      console.log("post was update")
    );
  };
  return (
    <>
      {!!post ? (
        <article className="Post">
          <div className="Post--content">
            {title && <h3>{title}</h3>}
            <div>{content}</div>
          </div>
          <div className="Post--meta">
            <div>
              <p>
                <span role="img" aria-label="star">
                  ⭐️
                </span>
                {stars}
              </p>
              <p>
                <span role="img" aria-label="comments">
                  🙊
                </span>
                {comments}
              </p>
              {user && user.displayName && <p>Posted by {user.displayName}</p>}
              {date && <p>{`${date}`}</p>}
            </div>
            <div>
              <button className="star" onClick={() => star()}>
                Star
              </button>
              {
                <button className="delete" onClick={() => onRemovePost()}>
                  Delete
                </button>
              }
            </div>
          </div>
        </article>
      ) : (
        <p>Post not found</p>
      )}
    </>
  );
};

Post.defaultProps = {
  title: "An Incredibly Hot Take",
  content:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.",
  user: {
    id: "123",
    displayName: "Bill Murray",
    email: "billmurray@mailinator.com",
    photoURL: "https://www.fillmurray.com/300/300",
  },
  createdAt: new Date(),
  stars: 0,
  comments: 0,
};

export default Post;
