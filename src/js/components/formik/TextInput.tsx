import * as React from 'react'
import TextInput from '../TextInput'

const FormikTextInput = ({ field, form, ...props }: any) => (
  <TextInput {...field} {...props} />
)

export default FormikTextInput
