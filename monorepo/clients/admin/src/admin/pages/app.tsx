
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DevelopmentTools from "../components/dev-tools"
import { TechnicalIssues } from "../components/error"
import { ZendeskWidget } from "../components/external-services"
import { GoogleFontsLoader } from "../components/fonts"
import '../styles/main.scss'
import LoggedRoute from './admin'
import SubscriptionEditPage from './public/subscription-edit'

function AuthExample(): JSX.Element {
  return <div>
    <Router>
      <Switch>
        <Redirect from='/register' to='/' />
        <Route exact path='/subscriptions/:id/edit' component={SubscriptionEditPage} />
        <Route path='/' component={LoggedRoute} />
        <Route component={TechnicalIssues} />
      </Switch>
    </Router>
    {import.meta.env.ENV ? <DevelopmentTools /> : <div />}
    <ZendeskWidget />
    <ToastContainer />
    <GoogleFontsLoader fonts='Source Sans Pro' />
  </div>
}

export default AuthExample
