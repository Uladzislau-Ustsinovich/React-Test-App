import React, { useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ROUTE_PATHS } from '../../constants/routePaths'
import { GitReposTable } from '../gitReposTable/GitReposTable'
import { GitReposChart } from '../gitReposChart/GitReposChart'
import { Switch, Route } from 'react-router-dom'
import { GitReposWrapper } from './gitRepos.styled'
import { fetchMembers } from './state/gitRepos.action'
import { Loader } from '../../components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { gitReposDataSelector } from './state/gitRepos.selectors'

const TRANSITION_TIMEOUT = 1000

export const GitRepos = () => {
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const data = useSelector(gitReposDataSelector)

  useEffect(() => {
    if (!data.length) {
      setLoading(true)
      dispatch(fetchMembers()).then(() => setLoading(false))
    }
  }, [data.length, dispatch])

  if (isLoading) {
    return <Loader />
  }

  return (
    <GitReposWrapper>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={TRANSITION_TIMEOUT}>
              <Switch location={location}>
                <Route exact path={ROUTE_PATHS.table} component={GitReposTable} />
                <Route path={ROUTE_PATHS.chart} component={GitReposChart} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </GitReposWrapper>
  )
}
