// Write automated tests for the App component

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

describe('App', () => {
  // Test that the App component renders without crashing
  test('renders without crashing', () => {
    <Provider>
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
    </Provider>
  }
  );
  // Test that the App component renders a div with the class name App-header
  test('renders a div with the class name App-header', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('.App-header').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a Route component
  test('renders a Route component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('Route').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a Routes component
  test('renders a Routes component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('Routes').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a BrowserRouter component
  test('renders a BrowserRouter component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('BrowserRouter').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a LoginPage component
  test('renders a LoginPage component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('LoginPage').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a HomePage component
  test('renders a HomePage component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('HomePage').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a NavBar component
  test('renders a NavBar component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('NavBar').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a ProfilePage component
  test('renders a ProfilePage component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('ProfilePage').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a CreatePostPage component
  test('renders a CreatePostPage component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('CreatePostPage').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a CreateTipPage component
  test('renders a CreateTipPage component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('CreateTipPage').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a EditProfilePage component
  test('renders a EditProfilePage component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('EditProfilePage').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a EditPost component
  test('renders a EditPost component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('EditPost').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a EditTip component
  test('renders a EditTip component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('EditTip').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a PostPage component
  test('renders a PostPage component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('PostPage').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a TipPage component
  test('renders a TipPage component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('TipPage').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a Post component
  test('renders a Post component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('Post').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a Tip component
  test('renders a Tip component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('Tip').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a Profile component
  test('renders a Profile component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('Profile').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a PostList component
  test('renders a PostList component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('PostList').length).toBe(1);
    </Provider>
  }
  );
  // Test that the App component renders a TipList component
  test('renders a TipList component', () => {
    <Provider>
      const wrapper = shallow(<App />);
      expect(wrapper.find('TipList').length).toBe(1);
    </Provider>
  }
  );
}
);