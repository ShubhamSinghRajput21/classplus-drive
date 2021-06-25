import React,{useState} from 'react';
import "./Header.css";

function Header(props) {
    const [input,setInput] = useState('');
    const [suggestions,setSuggestions] = useState([]);

    const onSubmit = () => {
        setSuggestions([...suggestions,input]);
        props.parentCallback(input);
    }
    
    const handleInput = (e) => {
        setInput(e.target.value);
    }

    return (
        <div className="header">
            <h3>PicCollage</h3>
            <div className="headerSearchInput">
                <input className="input" type="text" placeholder="Search Photos" value={input} onChange={(e)=>handleInput(e)}/>
                {/* {suggestions.map((item)=>
                    <li>{item}</li>
                )} */}
            </div>
            <button type="button" className="searchButton" onClick={onSubmit}>Submit</button>
            {console.log("suggestions",suggestions)}
        </div>
    )
}

export default Header;