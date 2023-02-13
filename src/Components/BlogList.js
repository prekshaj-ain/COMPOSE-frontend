import React from "react";
import BlogItem from "./BlogItem";
import "./BlogList.css";
import Section from './UIElements/Section'
function BlogList(props) {
  return (
    <Section className="posts">
      {props.heading && <h1 className="heading">{props.heading}</h1>}
      {props.posts.length === 0 && <h3 className="heading">Nothing to show</h3>}
      {props.posts.length !== 0 && props.posts.map((post) => (
        <BlogItem
          key={post.id}
          id={post.id}
          title={post.title}
          desc={post.description}
          image={post.image}
          categories = {post.categories}
          date = {post.createdAt}
          name = {post.author.username}
          userImg = {post.author.image}
          uid = {post.author.id}
          userData={props.userData}
        />
      ))}
    </Section>
  );
}

export default BlogList;
