import Input from '../../UI/Input';
import styles from './MealItemForum.module.css'

const MealItemForum =(props)=>{
  return (
      <form className={styles.form}>
          <Input label="Amount" input={{
            id:"amount_" + props.id,
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue: '1'
          }}/>
          <button>+ Add</button>
      </form>
  )
}

export default MealItemForum;