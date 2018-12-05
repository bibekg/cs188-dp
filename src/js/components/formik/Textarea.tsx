import * as React from 'react'
import Textarea from '../Textarea'

const FormikTextarea = ({ field, form, ...props }: any) => (
  <Textarea {...field} {...props} />
)

export default FormikTextarea
