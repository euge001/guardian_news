import React, { useState, useEffect } from 'react';
 


   const SearchResultsList = props => {
      const resultList = props.data;
      console.log(resultList);
      return <ul>{resultList}</ul>;
  };


export default SearchResultsList