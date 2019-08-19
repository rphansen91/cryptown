import React from "react";
import { compose } from "redux";
import Typography from "@material-ui/core/Typography";
import { NewsDisplayAd } from "../../ads/slots";
import Article from "../Article";
import { withPost } from "../../store/reducers/post";
import withArticles from "./withArticles";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

export default compose(
  withPost,
  withArticles
)(({ q, loading, data, error, setPost, activePost, filter = v => v }) => (
  <div className="article-sidebar">
    <Typography variant="h1" color="textPrimary" className="my-2">
      Articles {error ? `- ${error}` : ""}
    </Typography>

    {loading && <CircularProgress style={{ margin: "auto" }} />}
    {data
      ? (data.news || []).filter(filter).reduce((acc, a, i) => {
          if (i % 2 === 0) {
            acc.push(
              <NewsDisplayAd
                style={{
                  display: "block",
                  maxWidth: "100%",
                  margin: "auto",
                  width: 350
                }}
                key={i + "ad"}
              />
            );
          }
          const isActive =
            activePost &&
            activePost.publishedAt === a.publishedAt &&
            activePost.title === a.title;
          acc.push(
            <Link
              aria-label="Read More"
              className="d-block p-2"
              onClick={() => setPost(a)}
              to={`/post/${a.publishedAt}`}
              key={i}
            >
              <Article
                isActive={isActive}
                // image={a.urlToImage}
                title={a.title}
                actions={
                  <CardActions>
                    <Button color="primary" aria-label="Read More">
                      {isActive ? "Currently Reading" : "Read More"}
                    </Button>
                  </CardActions>
                }
              />
            </Link>
          );
          return acc;
        }, [])
      : null}
  </div>
));
