export default function AddSmthImage({handleImageClick, imageId}) {
    return (
        <div className='input-container'>
            <img id={imageId} 
                src="/images/plus.jpg" 
                alt="plus immage" 
                onClick={handleImageClick} />
        </div>
    );
}