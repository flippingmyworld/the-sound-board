import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

const store = createStore(reducers);

const ReduxWrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

export default ReduxWrapper;
export { store };
