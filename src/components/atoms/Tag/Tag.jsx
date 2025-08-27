import styles from './Tag.module.css';

function Tag({className='', img=null, value=''}){
    const classNames = [styles.tag, className].join(' ');
    return(
        <div className={classNames}>
            {img && <img src={img}/>}
            <p>{value}</p>
        </div>
    );
}

export default Tag;