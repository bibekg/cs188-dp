const mock = {
  '1': {
    name: '2018 Summer End in Utah',
    startDate: '12/1/2018',
    endDate: '12/5/2018',
    media: [
      {
        id: '1',
        dateTime: new Date('2018-09-20T09:03:27.339Z'),
        type: 'image',
        src: require('./images/trip1-1.jpeg'),
        description: 'A quick post-hike wade through Emerald River.',
        location: 'Zion National Park, Utah',
        link: {
          type: 'note',
          id: '2'
        }
      },
      {
        id: '2',
        dateTime: new Date('2018-09-20T10:03:27.339Z'),
        type: 'note',
        content: `
          Zion is such a dope place. Let me tell you all about it. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
      },
      {
        id: '3',
        dateTime: new Date('2018-09-21T09:03:27.339Z'),
        type: 'image',
        src: require('./images/trip1-2.png'),
        description: 'Walking through the towering heights of Wall Street',
        location: 'Bryce Canyon National Park, Utah'
      }
    ]
    // add other trip data here for the mock
    // must add options for what types of documenation each trip has
  },
  '2': {
    name: 'My Second Trip',
    startDate: '12/1/2018',
    endDate: '12/5/2018'
    // add other trip data here for the mock
  },
  '3': {
    name: 'My Third Trip',
    startDate: '12/1/2018',
    endDate: '12/5/2018'
    // add other trip data here for the mock
  },
  '4': {
    name: 'My Fourth Trip',
    startDate: '12/1/2018',
    endDate: '12/5/2018'
    // add other trip data here for the mock
  },
  '5': {
    name: 'My Fifth Trip',
    startDate: '12/1/2018',
    endDate: '12/5/2018'
    // add other trip data here for the mock
  },
  '6': {
    name: 'My Sixth Trip',
    startDate: '12/1/2018',
    endDate: '12/5/2018'
    // add other trip data here for the mock
  },
  '7': {
    name: 'My Seventh Trip',
    startDate: '12/1/2018',
    endDate: '12/5/2018'
    // add other trip data here for the mock
  }
}

export default mock
