/**
 * @jest-environment jsdom
 */

import { login } from '../src/componentes/login.js';

import {
  // eslint-disable-next-line import/named
  signInWithPopup,
} from '../src/firebase/funcoesAuth';

jest.mock('../src/firebase/funcoesAuth.js');
jest.mock('../src/firebase/config.js');

describe('Testing function signInWithPopup of Firebase Auth', () => {
  beforeAll((done) => {
    document.body.id = 'root';
    document.body.innerHTML = '';
    document.body.append(login());
    done();
  });

  it("should return an user id when button 'SignIn with Google' is clicked", (done) => {
    const btn = document.getElementById('imgGoogle');
    const eventClick = new Event('click');
    btn.dispatchEvent(eventClick);
    const id = 'fake-id-user';
    const id2 = 'fake-id-user-2';

    signInWithPopup()
      .then((data) => {
        expect(data).toBe(id);
        expect(data).not.toBe(id2);
        done();
      })
      .catch(done);
  });
});
