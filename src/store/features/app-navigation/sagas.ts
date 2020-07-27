import { put, takeLatest, take, call, delay } from 'redux-saga/effects'
import { AppNavigationTypes } from './types'
import { ModxActions } from './actions'
import { fetchModules } from './api'
import { websocketSend } from '../websocket'

function* listFetchModulesSaga(action: ReturnType<typeof ModxActions.fetchModulesListRequest>) {
  console.log('Worker saga hit')
  yield delay(1000)
  yield put(websocketSend('APP_NAVIGATION__LIST_FETCH_MODULES_REQUEST', {}))
}

function* listFetchModulesListener() {
  yield takeLatest(AppNavigationTypes.LIST_FETCH_MODULES, listFetchModulesSaga)
}

export default [listFetchModulesListener]
