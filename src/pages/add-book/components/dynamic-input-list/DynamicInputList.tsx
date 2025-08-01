import './DynamicInputList.scss'

import CancelIcon from '../../../../assets/icons/Сancel.svg?react'
import PlusIcon from '../../../../assets/icons/Plus.svg?react'

import { observer } from 'mobx-react-lite'

export const DynamicInputList = observer(({
  values,
  onChange,
  onAdd,
  onRemove,
  label,
  placeholder,
  error,
}: {
  values: string[],
  onChange: ({
    index, 
    authorFullName,
  }: {
    index: number, 
    authorFullName: string,
  }) => unknown,
  onAdd: () => unknown,
  onRemove: ({
    index,
  }: {
    index: number,
  }) => unknown,
  label: string,
  placeholder: string,
  error?: boolean,
}) => (
  <div className="dynamic-input-list">
    <span className="dynamic-input-list__label">
      {label}
    </span>
    {
      values.map((val, i) => (
        <div 
          key={i}
          className="dynamic-input-list__item"
        >
          <div className="dynamic-input-list__input-wrapper">
            <input
              type="text"
              value={val}
              onChange={(e) => onChange({
                index: i,
                authorFullName: e.target.value,
              })}
              placeholder={placeholder}
              className={`dynamic-input-list__input ${error 
                ? `error` 
                : ``}`}
            />
            {
              values.length > 1 
              && (
                <button
                  type="button"
                  className="dynamic-input-list__remove"
                  onClick={() => onRemove({
                    index: i,
                  })}
                >
                  <CancelIcon />
                </button>
              )}
          </div>
        </div>
      ))}
    <button
      type="button"
      className="dynamic-input-list__add"
      onClick={onAdd}
    >
      <PlusIcon />
      <span>
        Add Another Author
      </span>
    </button>
  </div>
))
