import "./Toggle.scss"
import clsx from "clsx"

export function Toggle({
  label,
  isChecked,
  onChange,
  className,
}: {
  label: string,
  isChecked: boolean,
  onChange: () => unknown,
  className?: string,
}) {
  return (
    <label className={clsx(`toggle`, className)}>
      {label}
      <input
        type="checkbox"
        className="toggle__input"
        checked={isChecked}
        onChange={onChange}
      />
      <span className="toggle__switch" />
    </label>
  )
}
