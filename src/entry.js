import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux/lib/reducer'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import App from './App'
import rootReducer from './reducers/index'

const FastClick = require('fastclick')

//解决移动端300毫秒延迟
FastClick.attach(document.body)
const middlewares = [thunk]

const store = createStore(
    combineReducers({routing: routerReducer, ...rootReducer}),
    composeWithDevTools(applyMiddleware(...middlewares))
)

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )

render(App)

if(module.hot) {
    module.hot.accept('./App', () => {
        const NextRootContainer = require('./App').default
        console.log(NextRootContainer)
        render(NextRootContainer)
    })
}