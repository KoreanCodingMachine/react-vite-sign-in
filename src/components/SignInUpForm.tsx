import { PropsWithChildren } from 'react'
import { Form, FormField } from '../components/styled/Form'

type SignInUpFormProps<T, V> = PropsWithChildren<{
  formFields: T[]
  formValueValidationMessage: V
  onSubmit: React.FormEventHandler<HTMLFormElement>
  title: string
}>

function SignInUpForm<
  T extends Record<string, any>,
  V extends Record<string, string>
>({
  children,
  formFields,
  formValueValidationMessage,
  onSubmit,
  title,
}: SignInUpFormProps<T, V>) {
  return (
    <div>
      <h3>{title}</h3>

      <div className="form-wrapper">
        <Form onSubmit={onSubmit}>
          {formFields.map(field => {
            const name = field.name as string

            return (
              <FormField key={name}>
                <input {...field} />
                {formValueValidationMessage[name] ? (
                  <span style={{ color: 'red' }}>
                    * {formValueValidationMessage[name]}
                  </span>
                ) : null}
              </FormField>
            )
          })}

          {children}
        </Form>
      </div>
    </div>
  )
}

export default SignInUpForm
