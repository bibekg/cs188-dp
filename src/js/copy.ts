export default {
  createTrip: {
    title: 'Start New Trip',
    subtitle:
      'Off on a new adventure? Give the trip a title, start date, and end date to get started.',
    fields: {
      name: {
        name: 'Trip Name',
        placeholder: 'A Splendid Summer on Saturn'
      },
      startDate: {
        name: 'Start Date'
      },
      endDate: {
        name: 'End Date'
      }
    },
    submitButtonText: 'Create Trip'
  },
  tripFeed: {
    createTripButtonText: 'Start New Trip',
    searchBox: {
      placeholder: '🔍 Type to search your trips'
    }
  },
  tripPage: {
    addPhoto: 'Add Photo',
    addNote: 'Add Note'
  },
  addMedia: {
    photo: {
      title: 'Add a Photo',
      subtitle:
        'Please specify the photo you would like to add and provide a description.',
      fields: {
        title: {
          name: 'Title',
          placeholder: 'Lower Antelope Canyon'
        },
        caption: {
          name: 'Caption',
          placeholder: 'The calm before the storm'
        },
        description: {
          name: 'Description',
          placeholder:
            "A brief 5 minutes after this shot was taken, it started raining like I've never seen..."
        },
        photoLocationName: {
          name: 'Photo Location Name',
          placeholder: 'Grand Canyon'
        },
        upload: {
          name: 'Upload'
        },
        date: {
          name: 'Date'
        },
        time: {
          name: 'Time'
        },
        latitude: {
          name: 'Latitude'
        },
        longitude: {
          name: 'Longitude'
        }
      },
      photoButtonText: 'Add Photo'
    },
    note: {
      title: 'Add a Note',
      subtitle: 'Please write your note below.',
      fields: {
        title: {
          name: 'Title',
          placeholder: 'Journal Entry 1'
        },
        note: {
          name: 'Note',
          placeholder: 'Four scores and seven years ago...'
        },
        date: {
          name: 'Date'
        }
      },
      noteButtonText: 'Add Note'
    }
  }
}
