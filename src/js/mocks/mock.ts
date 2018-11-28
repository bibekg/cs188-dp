import { Trip } from '../type-defs/Trip'
import { MediaItemType } from '../type-defs/MediaItem'

const mock: { [id: string]: Trip } = {
  '1': {
    id: '1',
    name: '2018 Summer End in Utah',
    startDate: new Date('12/1/2018'),
    endDate: new Date('12/5/2018'),
    media: [
      {
        id: '1',
        dateTime: new Date('2018-09-20T09:03:27.339Z'),
        type: MediaItemType.Image,
        src: require('./images/trip1-1.jpeg') as string,
        description: 'A quick post-hike wade through Emerald River.',
        location: {
          lat: 0,
          lng: 0,
          name: 'Zion National Park'
        },
        links: [
          {
            type: MediaItemType.Note,
            id: '2'
          }
        ]
      },
      {
        id: '2',
        dateTime: new Date('2018-09-20T10:03:27.339Z'),
        type: MediaItemType.Note,
        content: `
          Zion is such a dope place. Let me tell you all about it. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `
      },
      {
        id: '3',
        dateTime: new Date('2018-09-21T09:03:27.339Z'),
        type: MediaItemType.Image,
        src: require('./images/trip1-2.png'),
        description: 'Walking through the towering heights of Wall Street',
        location: {
          name: 'Bryce Canyon National Park, Utah',
          lat: 0,
          lng: 0
        }
      }
    ]
  },
  '2': {
    id: '2',
    name: 'My Second Trip',
    startDate: new Date('12/1/2018'),
    endDate: new Date('12/5/2018')
    // add other trip data here for the mock
  },
  '3': {
    id: '3',
    name: 'My Third Trip',
    startDate: new Date('12/1/2018'),
    endDate: new Date('12/5/2018')
    // add other trip data here for the mock
  },
  '4': {
    id: '4',
    name: 'My Fourth Trip',
    startDate: new Date('12/1/2018'),
    endDate: new Date('12/5/2018')
    // add other trip data here for the mock
  },
  '5': {
    id: '5',
    name: 'My Fifth Trip',
    startDate: new Date('12/1/2018'),
    endDate: new Date('12/5/2018')
    // add other trip data here for the mock
  },
  '6': {
    id: '6',
    name: 'My Sixth Trip',
    startDate: new Date('12/1/2018'),
    endDate: new Date('12/5/2018')
    // add other trip data here for the mock
  },
  '7': {
    id: '7',
    name: 'My Seventh Trip',
    startDate: new Date('12/1/2018'),
    endDate: new Date('12/5/2018')
    // add other trip data here for the mock
  }
}

export default mock
