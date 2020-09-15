import React from "react";
import { Link } from "gatsby";
import moment from "moment";
import "./style.scss";
import { getReadingTime } from "../../utilities/readingTime";
class PostTemplateDetails extends React.Component {
  render() {
    const { author } = this.props.data.site.siteMetadata;
    const post = this.props.data.markdownRemark;
    const tags = post.fields.tagSlugs;

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/">
          All Articles
        </Link>
      </div>
    );
    const readingTime = getReadingTime(post.html);

    const readingTimeComponent = (
      <div className="post-single__readingtime">
        <span>
          {`${readingTime} ${readingTime === 1 ? "min" : "mins"} read`}
        </span>
      </div>
    );
    const tagsBlock = (
      <div className="post-single__tags">
        <ul className="post-single__tags-list">
          {tags &&
            tags.map((tag, i) => (
              <li className="post-single__tags-list-item" key={tag}>
                <Link to={tag} className="post-single__tags-list-item-link">
                  {post.frontmatter.tags[i]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    );

    return (
      <div>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{post.frontmatter.title}</h1>
            {readingTimeComponent}
            <div
              className="post-single__body"
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div className="post-single__date">
              <em>
                Published {moment(post.frontmatter.date).format("D MMM YYYY")}
              </em>
            </div>
          </div>
          <div className="post-single__footer">
            {tagsBlock}
            <hr />
            <p className="post-single__footer-text">
              <br />
              Share this post on :{" "}
              <a
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default PostTemplateDetails;
