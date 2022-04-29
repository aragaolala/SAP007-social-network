const auth = {
  currentUser: {
    uid: 'fake-uid',
    displayName: 'fake-name',
    providerData: [{ providerId: 'google.com' }],
    email: 'fake-email',
    photoURL: 'fake-photo',
    metadata: {
      createdAt: 'fake-time',
    },
  },
};

// const setDoc = jest.fn((document, values) => Promise.resolve({values}));

const db = {};
const setDoc = jest.fn((document, values) => Promise.resolve({ values }));
const doc = jest.fn(() => Promise.resolve({}));
const collection = jest.fn(() => Promise.resolve({}));

export {
  auth, setDoc, doc, db, collection,
};
