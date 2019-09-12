import reactotron from 'reactotron-react-native';

export const log = (values) =>  reactotron.log(values);
export const warn = (values) =>  reactotron.warn(values);
export const error = (values) => reactotron.error(values);
