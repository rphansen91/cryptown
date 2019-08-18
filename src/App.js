import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { withApollo } from "react-apollo";
import Portfolio from "./portfolio/Portfolio";
import txStore from "./portfolio/txs";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Pairs from "./portfolio/Pairs";
import Current from "./portfolio/Current";
import Footer from "./ui/Footer";
import Routes from "./Routes";
import IconButton from "@material-ui/core/IconButton";
import NavigationClose from "@material-ui/icons/Close";
import NavigationMenu from "@material-ui/icons/Menu";
import { withMenu } from "./store/reducers/menu";
import { withProfile } from "./store/reducers/profile";
import { PortfolioBannerAd } from "./ads/slots";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { withTxs } from "./store/reducers/transactions";
import { queryExchangeTxs } from "./gql/exchange";
import MomentUtils from "@date-io/moment";
import { darkTheme, lightTheme } from "./themes";
import Menu from "./ui/Menu";
import Chat from "./ui/Chat";
import Brand from "./ui/Brand";
import cx from "./utility/cx";
import "./App.css";

const concat = arr => arr.reduce((acc, c) => acc.concat(c), []);
class App extends Component {
  constructor(props) {
    super(props);
    this.txStore = txStore();
  }

  goTo(route) {
    this.props.history.push(route);
  }

  removeJSS() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  componentDidMount() {
    this.removeJSS();

    const { profile, setTxs } = this.props;
    const exOpts = name => Object.assign({ name }, profile[name]);
    const exTxs = name => queryExchangeTxs.call(this, exOpts(name));

    Promise.all([
      // exTxs('bittrex'),
      // exTxs('hitbtc'),
      this.txStore.get()
    ])
      .then(concat)
      .then(setTxs)
      .catch(e => {
        console.log("Error", "get transactions", e);
      });
  }

  render() {
    const { location, menu, toggleMenu, profile } = this.props;
    const display = location.pathname === "/";
    const theme = profile.theme === "dark" ? darkTheme : lightTheme;
    const backgroundColor = theme.palette.background.paper;
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div style={{ backgroundColor }}>
            <Menu />
            <div className={cx({ App: true, open: menu })}>
              <AppBar
                position="static"
                className={cx({
                  "primary-gradient": true,
                  "gradient-animated": menu
                })}
              >
                <Toolbar>
                  <IconButton
                    onClick={toggleMenu}
                    color="default"
                    aria-label="Menu"
                    style={{ width: 40, color: "#fff" }}
                  >
                    {menu ? (
                      <NavigationClose color="inherit" />
                    ) : (
                      <NavigationMenu color="inherit" />
                    )}
                  </IconButton>
                  <Link
                    to="/"
                    aria-label="Home"
                    style={{
                      verticalAlign: "middle",
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      textDecoration: "none"
                    }}
                  >
                    <Brand
                      style={{
                        color: "#fff",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center"
                      }}
                    />
                  </Link>
                  <Pairs style={{ width: 70 }} />
                </Toolbar>
                <MuiThemeProvider theme={darkTheme}>
                  <div
                    style={{
                      display: display ? "initial" : "none",
                      overflow: "hidden"
                    }}
                  >
                    <PortfolioBannerAd />
                    <Current
                      className="white-text"
                      style={{ marginTop: "1em" }}
                    />
                    <Portfolio title="" />
                  </div>
                </MuiThemeProvider>
              </AppBar>
              <Routes />
              <Footer />
            </div>
          </div>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default compose(
  withRouter,
  withProfile,
  withMenu,
  withTxs,
  withApollo
)(App);
