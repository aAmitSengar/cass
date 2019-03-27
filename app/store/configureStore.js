// @flow
import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';
import initialstate from './../data/appstate/initialstate';

const selectedConfigureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export const { configureStore } = selectedConfigureStore;

export const { history } = selectedConfigureStore;
