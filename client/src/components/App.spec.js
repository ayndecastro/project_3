import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../App';

describe('components', () => {
  it('renders correctly', () => {
      const BankButtons = shallow(<App />);
      expect(BankButtons).toHaveLength(1);
  });
});

describe('components', () => {
    it('renders correctly', () => {
        const ConfirmTrip = shallow(<App />);
        expect(ConfirmTrip).toHaveLength(1);
    });
  });

  describe('components', () => {
    it('renders correctly', () => {
        const DatePicker = shallow(<App />);
        expect(DatePicker).toHaveLength(1);
    });
  });