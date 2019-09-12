import {applyMiddleware, compose, createStore} from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/RootSaga";
import '../Reactotron/ReactotronConfig';
import Reactotron from 'reactotron-react-native';

// create our new saga monitor
const sagaMonitor = Reactotron.createSagaMonitor();

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(sagaMiddleware),
    )
);

sagaMiddleware.run(rootSaga);

export default store;
