import { subirPosts } from '../src/firebase/funcoesFirestore';
import {
  addDoc, collection,
} from '../src/firebase/config';

jest.mock('../src/firebase/config');

