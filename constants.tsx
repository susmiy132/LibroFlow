
import React from 'react';

export const CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Science',
  'History',
  'Technology',
  'Philosophy',
  'Biography',
  'Business',
  'Arts',
  'Self-Help',
  'Mystery',
  'Education'
];

export const FINE_PER_DAY = 10; // e.g., $10 or units

export const APP_NAME = "LibroFlow";

export const MOCK_BOOKS: any[] = [
  {
    id: '1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    category: 'Technology',
    quantity: 5,
    available: 3,
    imageUrl: 'https://picsum.photos/seed/code/400/600',
    description: 'A handbook of agile software craftsmanship.'
  },
  {
    id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    category: 'Fiction',
    quantity: 10,
    available: 10,
    imageUrl: 'https://picsum.photos/seed/gatsby/400/600',
    description: 'A classic of American literature.'
  },
  {
    id: '3',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    isbn: '978-0062316097',
    category: 'History',
    quantity: 8,
    available: 5,
    imageUrl: 'https://picsum.photos/seed/sapiens/400/600',
    description: 'A brief history of humankind.'
  },
  {
    id: '4',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    isbn: '978-0374275631',
    category: 'Philosophy',
    quantity: 6,
    available: 2,
    imageUrl: 'https://picsum.photos/seed/thinking/400/600',
    description: 'Exploration of human thought processes.'
  },
  {
    id: '5',
    title: 'The Immortal Life of Henrietta Lacks',
    author: 'Rebecca Skloot',
    isbn: '978-1400052189',
    category: 'Non-Fiction',
    quantity: 4,
    available: 4,
    imageUrl: 'https://picsum.photos/seed/henrietta/400/600',
    description: 'The story of cells that never died.'
  },
  {
    id: '6',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    isbn: '978-0553380163',
    category: 'Science',
    quantity: 7,
    available: 7,
    imageUrl: 'https://picsum.photos/seed/time/400/600',
    description: 'A landmark volume in science writing by one of the great minds of our time.'
  },
  {
    id: '7',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    isbn: '978-1451648539',
    category: 'Biography',
    quantity: 5,
    available: 3,
    imageUrl: 'https://picsum.photos/seed/jobs/400/600',
    description: 'The exclusive biography of the creative entrepreneur who revolutionized six industries.'
  },
  {
    id: '8',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '978-0735211292',
    category: 'Self-Help',
    quantity: 15,
    available: 12,
    imageUrl: 'https://picsum.photos/seed/habits/400/600',
    description: 'An easy and proven way to build good habits and break bad ones.'
  },
  {
    id: '9',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    isbn: '978-0307887894',
    category: 'Business',
    quantity: 9,
    available: 6,
    imageUrl: 'https://picsum.photos/seed/lean/400/600',
    description: 'How constant innovation creates radically successful businesses.'
  },
  {
    id: '10',
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    isbn: '978-0307949486',
    category: 'Mystery',
    quantity: 12,
    available: 10,
    imageUrl: 'https://picsum.photos/seed/tattoo/400/600',
    description: 'A dark and complex thriller.'
  },
  {
    id: '11',
    title: 'The Story of Art',
    author: 'E.H. Gombrich',
    isbn: '978-0714832470',
    category: 'Arts',
    quantity: 3,
    available: 3,
    imageUrl: 'https://picsum.photos/seed/art/400/600',
    description: 'One of the most famous and popular books on art ever published.'
  },
  {
    id: '12',
    title: 'Pedagogy of the Oppressed',
    author: 'Paulo Freire',
    isbn: '978-0826412768',
    category: 'Education',
    quantity: 6,
    available: 5,
    imageUrl: 'https://picsum.photos/seed/pedagogy/400/600',
    description: 'A seminal work in the field of critical pedagogy.'
  }
];
