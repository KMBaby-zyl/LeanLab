import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {cyan500} from 'material-ui/styles/colors';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        textColor: cyan500,
    },
    appBar: {
        height: 50,
    }
});


import {Component, PropTypes} from 'react';

/*
 * 来自源码
 * */
class MuiThemeProvider extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    muiTheme: PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      muiTheme: muiTheme
    };
  }

  render() {
    return this.props.children;
  }
}

export default MuiThemeProvider;
