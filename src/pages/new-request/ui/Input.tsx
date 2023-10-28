import React, { useId } from 'react'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          {...props}
          id={id}
          ref={ref}
          className={`block w-full text-sm border-b border-b-[#969696] py-2 text-gray-900 placeholder:text-gray-400 ${props.className}`}
        />
      </div>
    </div>
  );
})

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  label: string;
  options: React.HTMLProps<HTMLOptionElement>[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, options, ...props }, ref) => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <select
          {...props}
          id={id}
          ref={ref}
          className={`block w-full text-sm border-b border-b-[#969696] py-2 text-gray-900 placeholder:text-gray-400 ${props.className}`}
        >
          {options.map(option => (
            <option key={String(option.value)} {...option} />
          ))}
        </select>
      </div>
    </div>
  );
})

interface RadioGroupProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  items: React.HTMLProps<HTMLInputElement>[]
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ label, items, ...props }, ref) => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-900">
        {label}
      </label>
      <div className="mt-2 flex gap-4" id={id} ref={ref}>
        {items.map(item => (
          <label key={String(item.value)} className="flex items-center gap-2">
            <input type="radio" {...props} {...item} /> {item.label}
          </label>
        ))}
      </div>
    </div>
  );
})

export default Input