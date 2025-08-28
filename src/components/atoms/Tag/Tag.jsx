import styles from './Tag.module.css';

function Tag({className='', img=null, text='', onClick=null}){
    return(
        <button className={className||styles.tag} onClick={onClick}>
            {img && <img src={img}/>}
            <p>{text}</p>
        </button>
    );
}

export default Tag;