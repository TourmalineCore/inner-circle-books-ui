import './RadioGroup.scss'

type Option = {
  value: string,
  label: string,
  icon?: JSX.Element,
}

export const RadioGroup = ({
  label,
  value, 
  options, 
  onChange, 
}: { 
  label: string,
  value: string,
  options: Option[],
  onChange: (value: string) => void,
}) => (
  <div className="radio-group">
    <span className="radio-group__label">{label}</span>
    <div className="radio-group__options">
      {options.map(({
        value: val, label: optionLabel, icon, 
      }) => (
        <label
          key={val}
          className={`radio-group__option ${value === val ? `radio-group__option--active` : ``}`}
        >
          <input
            type="radio"
            name={label}
            value={val}
            checked={value === val}
            onChange={() => onChange(val)}
          />
          <span className="radio-group__text">{optionLabel}</span>
          {icon && <span className="radio-group__icon">{icon}</span>}

        </label>
      ))}
    </div>
  </div>
)
