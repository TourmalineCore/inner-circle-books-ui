import "./FilterChip.scss"
import clsx from "clsx"

export const FilterChip = ({
  id,
  name,
  className,
  isActive,
  onClick,
}: {
  id: number,
  name: string,
  className?: string, 
  isActive: boolean,
  onClick: (id: number) => unknown,
}) => {
  return (
    <button
      key={id}
      type="button"
      className={clsx(`filter-chip`, className, {
        "filter-chip--active": isActive,
      })}
      onClick={() => onClick(id)}
    >
      {name}
    </button>
  )
}