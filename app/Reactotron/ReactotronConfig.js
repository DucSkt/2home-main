import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';

Reactotron.configure();

Reactotron.useReactNative(); // add all built-in react native plugins

Reactotron.use(sagaPlugin());


if (__DEV__) {
    Reactotron.connect();
    Reactotron.clear();
}
