import React from "react";
import Post from "./Post";
import AddPost from "./AddPost";

const Posts = ({ posts, onCreatePost, onRemovePost = () => {} }) => {
  return (
    <section className="Posts">
      <AddPost onCreate={onCreatePost} />
      {posts.map((post) => (
        <Post
          {...post}
          onRemovePost={() => onRemovePost(post.id)}
          key={post.id}
        />
      ))}
    </section>
  );
};

export default Posts;
