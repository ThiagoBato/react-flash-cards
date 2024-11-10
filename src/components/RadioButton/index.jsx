/* eslint-disable react/prop-types */
import { getNewId } from "../../services/idService";



export function RadioButton({
  id = getNewId(), 
  name = 'radioButtonName', 
  children: buttonDescription = 'Descrição do Botão',
  RadioChecked = false,
  onButtonClick = null
}) {
  function handleRadioButtonChange(){
    if(onButtonClick){
      onButtonClick();
    }
  }

  return (
    <>
      <label className="flex justify-center items-center gap-2 leading-4 cursor-pointer">
        <input type="radio" name={name} id={id} checked={RadioChecked} onChange={handleRadioButtonChange} />
        {buttonDescription}
      </label>
    </>
  )
}
