import React from "react";
import { Link } from "gatsby";
import moment from "moment";
import "./style.scss";
import _ from "lodash";
import { getReadingTime } from "../../utilities/readingTime";
class Post extends React.Component {
  render() {
    const { html } = this.props.data.node;
    const { title, date, description, tags } = this.props.data.node.frontmatter;
    const { slug } = this.props.data.node.fields;
    const readingTime = getReadingTime(html);
    const readingTimeComponent = (
      <div className="post__readingtime">
        <span>
          {`${readingTime} ${readingTime === 1 ? "min" : "mins"} read`}
        </span>
      </div>
    );
    return (
      <div className="post">
        <div className="post__meta">
          <time
            className="post__meta-time"
            dateTime={moment(date).format("MMMM D, YYYY")}
          >
            {moment(date).format("MMMM YYYY")}
          </time>
          <span className="post__meta-divider" />
        </div>
        <h2 className="post__title">
          <Link className="post__title-link" to={slug}>
            {title}
          </Link>
        </h2>
        {readingTimeComponent}
        <div className="post__tags">
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/tags/${_.kebabCase(tag)}`}
              className="post__tags-link"
            >
              {tag}
            </Link>
          ))}
        </div>
        <p className="post__description">{description}</p>
        <Link className="post__readmore" to={slug}>
          Read
        </Link>
      </div>
    );
  }
}

export default Post;
