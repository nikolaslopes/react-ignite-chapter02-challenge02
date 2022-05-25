import { Switch, Route } from 'react-router-dom'

import { Dashboard } '../pages/Dashboard'

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
    </Switch>
  )
}
