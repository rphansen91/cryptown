import React from "react";
import { compose } from "redux";
import Typography from "material-ui/Typography";
import { NewsDisplayAd } from "../../ads/slots";
import Article from "../Article";
import { withPost } from "../../store/reducers/post";
import withArticles from "./withArticles";
import { CardActions } from "material-ui/Card";
import Button from "material-ui/Button";
import { Link } from "react-router-dom";
import { CircularProgress } from "material-ui/Progress";

export default compose(
  withPost,
  withArticles
)(({ q, loading, data, error, setPost, filter = v => v }) => (
  <div className="article-sidebar">
    <Typography type="title" className="my-2">
      Articles {error ? `- ${error}` : ""}
    </Typography>

    {loading && <CircularProgress style={{ margin: "auto" }} />}
    {(data.news || []).filter(filter).reduce((acc, a, i) => {
      if (i && i % 2 === 0) {
        acc.push(
          <NewsDisplayAd
            style={{
              display: "block",
              maxWidth: "100%",
              width: 350
            }}
            key={i + "ad"}
          />
        );
      }
      acc.push(
        <Link
          className="d-block"
          onClick={() => setPost(a)}
          to={`/post/${a.publishedAt}`}
          key={i}
        >
          <Article
            image={a.urlToImage}
            title={a.title}
            actions={
              <CardActions>
                <Button dense color="primary" raised>
                  Read More
                </Button>
              </CardActions>
            }
          />
        </Link>
      );
      return acc;
    }, [])}
  </div>
));
