import { useEffect, useState } from "react"

import { TextArea } from "../TextArea"
import { TextInput } from "../TextInput"
import { Button } from "../Button";

/* eslint-disable react/prop-types */
export function FlashCardForm({
  createMode = true, 
  onPersist = null, 
  children: flashCard = null
}) {
  const [title, setTitle] = useState(flashCard?.title || '');
  const [description, setDescription] = useState(flashCard?.description || '');
  const [error, setError] = useState('');
  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100'

  useEffect(()=>{
    if(createMode){
      setTitle('')
      setDescription('')
    }
  },[createMode])

  function validateForm(){
    return title.trim() !== '' && description.trim() !== '';
  }

  function handleFormSubmit(event){
    event.preventDefault();
    if(validateForm() && onPersist){
        setError('');
        onPersist(title, description)
        handleFormReset(); 
    } else {
      setError('O preenchimento de título e descrição é obrigatório!');
    }
  }
  function handleFormReset (){
    setTitle('');
    setDescription('');
  }
  
  function handleTitleChange(newTitle){
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription){
    setDescription(newDescription);
  } 
  return (
    <>
      <form className={`${backgroundClassName} p-4`} onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <h2>Manutenção de Flash Cards</h2>
        <TextInput 
          labelDescription="Título:"
          title={title}
          inputValue={title}
          onInputChange={handleTitleChange}
        />
        <TextArea
          onTextAreaChange={handleDescriptionChange}
          textAreaValue={description}
          description={description}
          error={error}
        />
        <div className="flex items-center justify-end">
          <Button textColorClass="text-white" bgColorClass="bg-red-500" type="reset">Limpar</Button>
          <Button textColorClass="text-white" bgColorClass="bg-green-500" type='submit'>Salvar</Button>
        </div>
      </form>
    </>
  )
}
