// O trecho jest.fn() retorna uma função de mock para ser utilizada.
// A função Promise.resolve retorna uma Promise de que será resolvida.

export const signInWithEmailAndPassword = jest.fn(() => Promise.resolve({}));
export const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve({}));
export const signOut = jest.fn(() => Promise.resolve({}));
export const onAuthStateChanged = jest.fn(() => Promise.resolve({}));
export const sendEmailVerification = jest.fn(() => Promise.resolve({}));
export const auth = jest.fn();
export const signInWithPopup = jest.fn((_auth_, provider) => Promise.resolve({ provider }));

export const db = jest.fn();

export const collection = jest.fn((_db_, _collection_) => _collection_);

export const addDoc = jest.fn((Collection, data) => Promise.resolve({ [Collection]: data }));

export const doc = jest.fn((_db_, nameCol, idDoc) => Object({ [nameCol]: idDoc }));

export const serverTimestamp = jest.fn();
export const getDoc = jest.fn(() => Promise.resolve({}));

/* Promise resolve() method:
Promise.resolve() method in JS returns a Promise object that is resolved with a given value.
Any of the three things can happened:

- If the value is a promise then promise is returned.
- If the value has a “then” attached to the promise,
then the returned promise will follow that “then” to till the final state.
- The promise fulfilled with its value will be returned.

EX: Promise.resolve(17468).then((value) => console.log(value));
output: 17468
 */
