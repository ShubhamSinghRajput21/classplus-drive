import React,{useState} from 'react';
import "./Image.css";
import ReactModal from 'react-modal';


//This is where the images are loaded and modal is created.
export default function Image(props) {
    const {server,id,secret} = props;

    const [openModal,setopenModal] = useState(false);

    function handleShowModal(){
        console.log('open')
        setopenModal(true);
    }
    
    function handleCloseModal(){
        console.log('close')
        setopenModal(false);
    }

    return (
        <div className="imageContainer" >
            <img src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`} className="image" onClick={handleShowModal}/>
            <ReactModal isOpen={openModal} onRequestClose={handleCloseModal} className="modal">
                <img src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}/>
                <button onClick={handleCloseModal}><h1>close</h1></button>
            </ReactModal>
        </div>
    )
}
