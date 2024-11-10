import { getNewId } from "../../services/idService";

/* eslint-disable react/prop-types */
export function TextArea({
  labelDescription = 'Descrição do label:',
  textAreaValue = 'Valor padrão da textarea',
  onTextAreaChange = null,
  id = getNewId(),
  maxLength = 230,
  rows = 4,
  error = false
}) {
  const currentCharacterCount = textAreaValue.length;

  function handleTextAreaChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        id={id}
        className="border p-1 resize-none"
        value={textAreaValue}
        onChange={handleTextAreaChange}
        maxLength={maxLength}
        rows={rows}
      ></textarea>
      
      <div className="flex justify-between text-xs">
        {error ? <span className="text-red-500">{error}</span> : <span> &nbsp;</span>}
        <span>Caracteres digitados: {currentCharacterCount} / {maxLength}</span>
      </div>
    </div>
  );
}
