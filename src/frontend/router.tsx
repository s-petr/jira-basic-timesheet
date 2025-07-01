import { view } from '@forge/bridge'
import { Action as ActionEnum } from '@remix-run/router'
import React, { useEffect, useState } from 'react'
import { Router as ReactRouter, Route, Routes } from 'react-router-dom'
import ReportPage from './pages/report'
import SettingsPage from './pages/settings'
import SummaryPage from './pages/summary'
import TimesheetPage from './pages/timesheet'

type Action = 'PUSH' | 'POP' | 'REPLACE'

export type Location<State = unknown> = {
  pathname: string
  search: string
  state: State
  hash: string
}

type History<LocationState = unknown> = {
  action: Action
  location: Location<LocationState>
  createHref(to: Location<LocationState>): string
  go(delta: number): void
  push(to: string, state?: LocationState): void
  replace(to: string, state?: LocationState): void
  listen(
    listener: (location: Location<LocationState>, action: Action) => void
  ): () => void
}

type HistoryState = Pick<History, 'action' | 'location'>

export default function Router() {
  const [history, setHistory] = useState<History | null>(null)
  const [historyState, setHistoryState] = useState<HistoryState | null>(null)

  useEffect(() => {
    if (!history) {
      view.createHistory().then(setHistory)
    } else {
      history.listen((location, action) =>
        setHistoryState({ action, location })
      )
    }
  }, [history])

  useEffect(() => {
    history &&
      !historyState &&
      setHistoryState({
        action: history.action,
        location: history.location
      })
  }, [history, historyState])

  return (
    history && (
      <ReactRouter
        navigator={history}
        navigationType={history.action as ActionEnum}
        location={history.location}>
        <Routes>
          <Route path='/summary?' element={<SummaryPage />} />
          <Route path='/timesheet' element={<TimesheetPage />} />
          <Route path='/report' element={<ReportPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </ReactRouter>
    )
  )
}
