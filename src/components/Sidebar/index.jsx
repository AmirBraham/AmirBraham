import React from "react";
import get from "lodash/get";
import { Link } from "gatsby";
import Menu from "../Menu";
import Links from "../Links";
import "./style.scss";
import _ from "lodash";
import { StaticQuery, graphql } from "gatsby";
import useDarkMode from "use-dark-mode";

function Sidebar(props) {
  const { location } = props;
  const { author, copyright, menu } = props.data.site.siteMetadata;
  const isHomePage = get(location, "pathname", "/") === "/";
  const darkMode = useDarkMode(true);
  const handleTheme = (theme) => {
    console.log(darkMode);
    darkMode.value ? darkMode.disable() : darkMode.enable();
  };

  /* eslint-disable jsx-a11y/img-redundant-alt */
  const authorBlock = (
    <div>
      {isHomePage ? (
        <h1 className="sidebar__author-title">
          <Link className="sidebar__author-title-link" to="/">
            {author.name}
          </Link>
        </h1>
      ) : (
        <h2 className="sidebar__author-title">
          <Link className="sidebar__author-title-link" to="/">
            {author.name}
          </Link>
        </h2>
      )}
    </div>
  );
  /* eslint-enable jsx-a11y/img-redundant-alt */

  return (
    <div className="sidebar">
      <div className="sidebar__inner">
        <div className="sidebar__author">{authorBlock}</div>
        <button onClick={() => handleTheme("dark")}>
          {darkMode.value ? "switch to light" : "switch to dark"}
        </button>
        <div>
          <Menu data={menu} />
          <StaticQuery
            query={graphql`
              query allTags {
                allMarkdownRemark {
                  group(field: frontmatter___tags) {
                    tag: fieldValue
                    totalCount
                  }
                }
              }
            `}
            render={(data) => {
              const tags = data.allMarkdownRemark.group;
              return (
                <ul className="sidebar__tags">
                  {tags.map(({ tag, totalCount }, key) => (
                    <li key={key}>
                      <Link to={`/tags/${_.kebabCase(tag)}`}>
                        {tag} ({totalCount})
                      </Link>
                    </li>
                  ))}
                </ul>
              );
            }}
          />
          <Links data={author} />
          <p className="sidebar__copyright">{copyright}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
