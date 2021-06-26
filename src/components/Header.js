import React,{useState,useRef,useEffect} from 'react';
import "./Header.css";

function Header(props) {
    const [input,setInput] = useState('');
    // Suggestions is the array which stores the value of previous searches
    const [suggestions,setSuggestions] = useState([]);
    const ulRef = useRef();
    const inputRef = useRef();
    
    useEffect(() => {
        //Assigning event to input box
        inputRef.current.addEventListener('click', (event) => {
        event.stopPropagation();
        ulRef.current.style.display = 'flex';
        });
        //Assigning event to the suggestions box i.e ul element
        document.addEventListener('click', (event) => {
        ulRef.current.style.display = 'none';
        });
    }, []);

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
                <input className="input" type="text" placeholder="Search Photos" value={input} ref={inputRef} onChange={(e)=>handleInput(e)}/>
                <ul className="listGroup" ref={ulRef}>
                    {suggestions.map((option, index) => {
                    return (
                        <button
                        type="button"
                        className="listItem"
                        key={index}
                        onClick={(e) => {
                            inputRef.current.value = option;
                        }}
                        >
                        <strong>{option}</strong>
                        </button>
                    );
                    })}
                </ul>
            </div>
            <button type="button" className="searchButton" onClick={onSubmit}>Submit</button>
            {console.log("suggestions",suggestions)}
        </div>
    )
}

export default Header;