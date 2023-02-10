import clsx from 'clsx'

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm'

export function Label({ id, children, className }) {
  return (
    <label
      htmlFor={id}
      className={"mb-3 block text-sm font-medium text-gray-700 " + className}
    >
      {children}
    </label>
  )
}

export function TextField({
  id,
  label,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  )
}


export function TextArea({
  id,
  label,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <textarea id={id} {...props} className={formClasses} />
    </div>
  )
}

export function FormSeperator ({ label, className = '', ...props }) {
  return (
    <div className={ ' inline-flex gap-2 items-center col-span-full w-full text-slate-500 ' + className}>
      <span className=' flex-grow h-[3px] bg-slate-100 rounded-full '></span>
      <span className='text-xs'>{label}</span>
      <span className=' flex-grow h-[3px] bg-slate-100 rounded-full '></span>
    </div>
  )
  }

export function TextFieldGroup ({ id, label, type="text", className = '', prefix, ...props }) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          {prefix}
        </span>
        <input id={id} type={type} {...props} className={"rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + formClasses} />
      </div>
    </div>
  )
  }

export function CheckboxField({ id, label, className = '', ...props }) {
  return (
    <div className={className}>
      <input
        id={id}
        type="checkbox"
        {...props}
        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
      />
      {label && <Label id={id}>{label}</Label>}
    </div>
  )
}

export function RadioField({ id, name, value, checked, label, className = '', ...props }) {
  return (

    <div className={"flex items-center " + className}>
      <input
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        type="radio"
        id={id}
        name={name}
        defaultChecked={checked}
        value={value} 
        {... props}
      />
      <Label id={id} className={"ml-2 mb-0 text-sm font-medium text-gray-900 dark:text-gray-300"}>
          {label}
      </Label>
    </div>
  )
}

export function SelectField({ id, label, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  )
}

