export default {
  createTrip: {
    title: 'Start New Trip',
    subtitle:
      'Off on a new adventure? Give the trip a title, start date, and end date to get started.',
    fields: {
      title: {
        name: 'Title',
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
    createTripButtonText: 'Start New Trip'
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
          placeholder: "Let's get this bread"
        },
        upload: {
          name: 'Upload'
        }
      },
      photoButtonText: 'Add Photo'
    }
  }
}
