import styles from './MealItem.module.css'
import MealItemForum from './MealItemForum';


const MealItem = (props) => {

    const price =`$${props.price.toFixed(2)}`

  return (
    <li>
      <div className={styles.meal}>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
          <MealItemForum id={props.id}/>
      </div>
    </li>
  );
};

export default MealItem;
