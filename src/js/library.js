const books = [];

const getBook = id => {
  return books.find(book => book.id == id);
};

const addBook = (name, publishedYear, genre, author, imageUrl, isAvailable) => {
  const id = books.length + 1;
  const book = {
    id,
    name,
    publishedYear,
    genre,
    author,
    imageUrl: imageUrl || './src/assets/images/no-image.png',
    isAvailable,
  };
  books.unshift(book);
};

const lendOrReturnBook = id => {
  const book = getBook(id);
  book.isAvailable = !book.isAvailable;
};

const sortBooks = (books, sortSelection) => {
  if (sortSelection == 'publishedYear') {
    books.sort((book1, book2) => {
      return Number(book1.publishedYear) - Number(book2.publishedYear);
    });
  } else if (sortSelection == 'isAvailable') {
    books.sort((book1, book2) => {
      if (book1.isAvailable) return -1;
      if (book2.isAvailable) return 1;
      return 0;
    });
  } else if (sortSelection == 'none') {
    books.sort((book1, book2) => Number(book2.id) - Number(book1.id));
  } else {
    books.sort((book1, book2) => {
      if (book1[sortSelection] < book2[sortSelection]) return -1;
      if (book1[sortSelection] > book2[sortSelection]) return 1;
      return 0;
    });
  }
};

const groupBooks = (groupSelection, sortSelection) => {
  const groupedBooks = books.reduce((grouped, book) => {
    let key = book[groupSelection];
    if (groupSelection == 'none') key = 'All Books';
    if (groupSelection == 'isAvailable')
      key = key ? 'Available' : 'Unavailable';
    grouped[key] = grouped[key] || [];
    grouped[key].push(book);
    return grouped;
  }, {});

  for (const key in groupedBooks) {
    sortBooks(groupedBooks[key], sortSelection);
  }

  return groupedBooks;
};

const load = booksCSVData => {
  booksCSVData
    .split('\n')
    .slice(1)
    .filter(line => line)
    .forEach((line, index) => {
      const [name, publishedYear, genre, author, imageUrl] = line.split(',');
      addBook(name, publishedYear, genre, author, imageUrl, index % 2 == 0);
    });
};
