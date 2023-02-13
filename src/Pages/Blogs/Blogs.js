import React, { useEffect, useState } from "react";
import BlogList from "../../Components/BlogList";
import axios from "../../instance";
import "./Blogs.css";
import { useLocation } from "react-router-dom";
import RecommendBlogList from "../../Components/RecommendBlogList";
import BlogPage from "../../Components/UIElements/BlogPage";
import Section from "../../Components/UIElements/Section";
import Skeleton from "../../Components/UIElements/Skeleton";
import Aside from "../../Components/UIElements/Aside";
function Blogs() {
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState({});
  const { search } = useLocation();
  const category = search.substring(5);
  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const res = await axios.get("/post/" + search);
      setPosts(res.data.posts);
      setInsight(res.data.catInsight);
      setLoading(false);
    };
    fetchPosts();
  }, [search]);
  function Feed() {
    return (
      <BlogPage>
        {loading ? (
          <>
          <Section>
            <Skeleton type="feed" />
          </Section>
          <Aside>
            <Skeleton type="spinner" />
          </Aside>
          </>
          
        ) : (
          <>
          <BlogList posts={Posts} userData={true} />
          <RecommendBlogList posts={Posts} />
          </>
        )}
      </BlogPage>
    );
  }
  function TagFeed() {
    return (
      <BlogPage>
        {loading ? (
          <Section>
            <Skeleton type="feed" />
          </Section>
        ) : (
          <BlogList posts={Posts} userData={true} heading={category} />
        )}
        <Aside>
          <div className="insights">
            <div className="postNum">
              <h2>{insight.postNum}</h2>
              <p>Blogs</p>
            </div>
            <div className="userNum">
              <h2>{insight.userNum}</h2>
              <p>Writers</p>
            </div>
          </div>
        </Aside>
      </BlogPage>
    );
  }
  if (search === "") return <Feed />;
  else return <TagFeed />;
}

export default Blogs;
