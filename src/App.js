import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import SearchForm from "./components/SearchForm";
import Nav from "./components/Nav";
import Gallery from "./components/Gallery";
import NotFound from "./components/NotFound";
 
const axios = require("axios");
const image_limit = 24;
const apiKey = "9c68a176275d3bcd1b19fd1bcf554336";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      nature_photos: [],
      animals_photos: [],
      guitar_photos: [],
      search_photos: [],
    };
  }

  requestImages = (tag) => {
    /**
     * Creates a dynamic url and returns an axios request
     */
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=${image_limit}&page=1&format=json&nojsoncallback=1&content_type=1&sort=relevance`;
    return axios.get(url);
  };

  componentDidMount = () => {
    const self = this; // helps maintain lexical scope

    axios
      .all([
        this.requestImages("nature"),
        this.requestImages("animals"),
        this.requestImages("electric%20%guitars"),
      ])
      .then(
        axios.spread((nature, planes, guitars) => {
          // When all requests are complete, set states
          self.setState({
            nature_photos: nature.data.photos.photo,
            animals_photos: planes.data.photos.photo,
            guitar_photos: guitars.data.photos.photo,
            loading: false,
          });

          //combinedPhotosArray = self.combinePhotos();
        })
      )
      .catch((error) => {
        console.error("Error fetching and parsing data", error);
      });
  };

  combinePhotos = () => {
    /**
     * Combines default photos from application's state to show an even amount of photos for each category
     */
    return [
      ...this.state.nature_photos.slice(0, 8),
      ...this.state.animals_photos.slice(0, 8),
      ...this.state.guitar_photos.slice(0, 8),
    ];
  };

  handleSearch = (query) => {
    const self = this; // helps maintain lexical scope

    this.setState({
      loading: true,
    });

    this.requestImages(query)
      .then((response) => {
        self.setState({
          search_photos: response.data.photos.photo,
          loading: false,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => <Landing />} />
            <Route
              exact
              path="/gallery"
              render={() => (
                <div>
                  <SearchForm search={this.handleSearch} />
                  <Nav />
                  <Gallery
                    isLoading={this.state.loading}
                    data={this.combinePhotos()}
                  />
                </div>
              )}
            />

            <Route
              exact
              path="/nature"
              render={() => (
                <div>
                  <SearchForm search={this.handleSearch} />
                  <Nav />
                  <Gallery
                    isLoading={this.state.loading}
                    data={this.state.nature_photos}
                  />
                </div>
              )}
            />

            <Route
              exact
              path="/animals"
              render={() => (
                <div>
                  <SearchForm search={this.handleSearch} />
                  <Nav />
                  <Gallery
                    isLoading={this.state.loading}
                    data={this.state.animals_photos}
                  />
                </div>
              )}
            />

            <Route
              exact
              path="/guitars"
              render={() => (
                <div>
                  <SearchForm search={this.handleSearch} />
                  <Nav />
                  <Gallery
                    isLoading={this.state.loading}
                    data={this.state.guitar_photos}
                  />
                </div>
              )}
            />

            <Route
              exact
              path="/q/:query"
              render={() => (
                <div>
                  <SearchForm search={this.handleSearch} />
                  <Nav />
                  <Gallery
                    isLoading={this.state.loading}
                    data={this.state.search_photos}
                  />
                </div>
              )}
            />

            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
