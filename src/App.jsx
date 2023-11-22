import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [length, setLength] = useState(30);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.sampleapis.com/codingresources/codingResources"
      );
      const result = await response.json();

      if (length >= result.length) {
        setHasMore(false);
      }

      setItems([...items, ...result.slice(length - 30, length)]);
      setLength(length + 30);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  function gotoSite(url) {
    return function () {
      window.open(url, "_blank");
    };
  }

  return (
    <Box
      sx={{
        pt: 2,
      }}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <Grid container spacing={2.5} columns={12}>
          {items.map((item) => (
            <Grid md={4} xs={12} lg={3} key={item.id}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    fontWeight={700}
                    sx={{ mb: 0.5 }}
                  >
                    {item.description}
                  </Typography>
                  <Box
                    component="div"
                    sx={{
                      mt: 0.5,
                      backgroundColor: "#FFF192",
                      px: 0.5,
                      py: 0.1,
                      borderRadius: 5,
                    }}
                    display="inline"
                  >
                    {item.types.map((type, index) => (
                      <Typography
                        sx={{ mb: 2, mt: 0.5, fontSize: 14 }}
                        color="text.secondary"
                        display="inline"
                      >
                        {type}
                        {index === item.types.length - 1 ? null : (
                          <span>, </span>
                        )}
                      </Typography>
                    ))}
                  </Box>
                  <Box component="div" sx={{ mt: 1, mb: 2 }} display="block">
                    {item.topics.map((type, index) => (
                      <Typography
                        sx={{ mb: 2, mt: 0.5, fontSize: 18 }}
                        color="text.secondary"
                        display="inline"
                      >
                        {type}
                        {index === item.topics.length - 1 ? null : (
                          <span>, </span>
                        )}
                      </Typography>
                    ))}
                  </Box>
                  <Box
                    component="div"
                    sx={{
                      backgroundColor: "#FEC2CD",
                      px: 1,
                      py: 0.2,
                      borderRadius: 5,
                    }}
                    display="inline"
                  >
                    {item.levels.map((type, index) => (
                      <Typography
                        sx={{ mb: 2, mt: 0.5, fontSize: 14 }}
                        color="text.secondary"
                        display="inline"
                      >
                        {type}
                        {index === item.levels.length - 1 ? null : (
                          <span>, </span>
                        )}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <span style={{ flexGrow: 1 }}></span>
                  <Button
                    onClick={gotoSite(item.url)}
                    variant="outlined"
                    endIcon={<ArrowRightIcon />}
                    sx={{ mb: 2, mr: 1 }}
                  >
                    Visit Site
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default App;
