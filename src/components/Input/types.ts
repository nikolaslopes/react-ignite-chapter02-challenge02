import { ComponentType, InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon?: ComponentType<IconBaseProps>
}

export interface IContainer {
  isFocused: boolean
  isFilled: boolean
}
