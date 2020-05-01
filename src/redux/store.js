import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './reducers';
import { index } from './sagas/index';

export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleWare = createSagaMiddleware();
const middlewares = [sagaMiddleWare, routerMiddleware(history)];


const store = createStore(
    rootReducer(history),
    composeEnhancers(applyMiddleware(...middlewares)),
);

sagaMiddleWare.run(index);

export default store;
