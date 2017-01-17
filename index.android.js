/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Calculator from './Calculator.js';
import {
  AppRegistry,
} from 'react-native';

export default class CalcApp extends Component {
  render() {
    return (
      <Calculator/>
    );
  }
}

AppRegistry.registerComponent('CalcApp', () => CalcApp);
