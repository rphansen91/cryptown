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
)(({ q, loading, data, error, setPost, filter = v => v }) => (
  <div className="article-sidebar">
    <Typography variant="h4" color="textPrimary" className="my-2">
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
          acc.push(
            <Link
              aria-label="Read More"
              className="d-block p-2"
              onClick={() => setPost(a)}
              to={`/post/${a.publishedAt}`}
              key={i}
            >
              <Article
                // image={a.urlToImage}
                title={a.title}
                actions={
                  <CardActions>
                    <Button color="primary" aria-label="Read More">
                      Read More
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
