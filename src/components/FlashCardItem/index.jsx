/* eslint-disable react/prop-types */
import { AiOutlineEdit as EditIcon, AiOutlineDelete as DeleteIcon } from 'react-icons/ai'

export function FlashCardItem({children: flashCard,onEdit = null, onDelete = null}) {
  const {title, description} = flashCard;

  function handleEditIconClick(){
    if(onEdit){
      onEdit(flashCard);
    }
  }

  function handleDeleteIconClick(){
    if(onDelete){
      onDelete(flashCard.id);
    }
  }
  return (
    <div className="border p-2 m-2 my-5">
      <ul>
        <li><strong>Título: </strong><span>{title}</span></li>
        <li><strong>Descrição: </strong><span>{description}</span></li>
      </ul>
      <div className='mt-4 flex items-center justify-end gap-4'>
        <EditIcon size={24} className='cursor-pointer' onClick={handleEditIconClick} />
        <DeleteIcon size={24} className='cursor-pointer' onClick={handleDeleteIconClick} />
      </div>
    </div>
  )
}
