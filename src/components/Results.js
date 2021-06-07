import React, {  useState } from "react";
import { useHistory } from "react-router-dom";


function Results () {
  const apiKey = 'e5a72453-f9b8-4031-8d16-02c39e72dc1e';
  const [input, setInput] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    searchAPI();
 };

  const searchAPI = async () => {
    const res = await fetch(`https://content.guardianapis.com/search?q=${input}&api-key=${apiKey}`);
    const data = await res.json();
    console.log(data);
  };

    return (
       
      <div>
test
        </div>
    );
};

export default Results