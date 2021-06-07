import React, { useState, useEffect } from 'react';
 
function BooksList () {
   const [books, updateBooks] = useState([]);
 
   React.useEffect(function effectFunction() {
       fetch(`https://content.guardianapis.com/search?q=show-tags=contributor&show-fields=all&api-key=78553091-f422-4259-957a-8487917d5090`)
           .then(response => response.json())
           .then(({ response: books }) => {
               updateBooks(books);
           });
   }, []);
   
   return (
   <ul>
           books.map(book => (
               <li key={book.response.results.id}>{book.response.results.webTitle}</li>
           ));
   </ul>
   );
}

export default BooksList