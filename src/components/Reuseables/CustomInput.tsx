import type React from "react"
import type { ChangeEvent } from "react"

interface CustomInputProps {
  type: string
  name: string
  placeholder: string
  value?: string | number | boolean | any
  handleChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleChecked?: any
  options?: string[]
  notBordered?: boolean
  borderColor?: string
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  options,
  notBordered,
  borderColor,
  name,
  value,
  handleChange,
  handleChecked,
}) => {
  const style = "grow w-full outline-none border-0 p-3 text-dark dark:text-white dark:bg-[#222]"
  // const [isOn, setIsOn] = useState(true);
  return (
    <div
      className={` flex  p-0.5 ${
        !notBordered ? `rounded-lg border` : "border-0"
      } ${borderColor ? `border-[${borderColor}]` : "border-[#444]"}`}
    >
      {(type == "text" || type == "number") && (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={value}
          className={`${style}`}
          placeholder={placeholder}
          onChange={handleChange}
          // contentEditable
        />
      )}

      {type == "select" && (
        <select className={`${style} bg-white dark:bg-[#222]`} name={name} onChange={handleChange}>
          <option className="text-dark/70 dark:text-gray-300">{placeholder}</option>

          {options?.map((item, i) => (
            <option key={i} className="text-dark/60 dark:text-gray-400" value={item}>
              {item}
            </option>
          ))}
        </select>
      )}

      {type == "textarea" && (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={6}
          maxLength={150}
          className={`${style}`}
          defaultValue={value}
          onChange={handleChange}
        />
      )}

      {type == "checkbox" && (
        <div className="flex gap-x-1 items-center">
          <input type="checkbox" name={name} checked={value} onChange={handleChecked} id="" className="size-4" />
          <p className="text-xs text-dark dark:text-white">{placeholder}</p>
        </div>
      )}

      {type == "toggle" && (
        <div className="flex items-center justify-center">
          <div
            onClick={handleChecked}
            className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${
              value == true ? "bg-[#e8d0c5] dark:bg-[#d4a574]" : "bg-gray-600/60 dark:bg-gray-700"
            }`}
          >
            <div
              className={`absolute w-4 h-4 rounded-full transition-transform ${
                value == true ? "bg-primary right-1 top-0.5" : "bg-white dark:bg-gray-200 left-1 top-0.5"
              }`}
            ></div>
          </div>
        </div>
      )}

      {type == "date" && (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={value}
          onChange={handleChange}
          className={`${style}`}
          placeholder={placeholder}
          // contentEditable
        />
      )}
    </div>
  )
}

export default CustomInput
