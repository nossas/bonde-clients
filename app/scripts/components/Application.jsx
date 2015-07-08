import AppMenu from './AppMenu.jsx'
import PubSub from 'pubsub-js'

Auth.configure({
  apiUrl: process.env.BASE_URL,
  handleTokenValidationResponse: function(resp) {
    // https://github.com/lynndylanhurley/j-toker/issues/10
    PubSub.publish("auth.validation.success", resp.data)
    return resp.data;
  }
});

export default class Application extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      user: Auth.user
    }
  }

  componentWillMount() {
    PubSub.subscribe('auth', function() {
      this.setState({user: Auth.user});
    }.bind(this));
  }

  render() {
    console.log(this.props)
    return(
      <div>
        <AppMenu />
        {this.props.children &&
          React.cloneElement(this.props.children, {user: this.state.user})}
      </div>
    )
  }
}
