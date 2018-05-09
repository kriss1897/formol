import { withState } from '@dump247/storybook-state'
import { boolean, selectV2, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import React from 'react'

import Formol, { Field } from '../src'
import { PersonForm, personExemple } from './exemples'
import { knobs, testFieldValue, typeFields } from './fields'

const withStateForm = (form, initial) =>
  withState({ transient: initial, item: initial })(({ store }) =>
    form({
      onSubmit: item => store.set({ item }) || false, // TODO: Fix that
      onChange: transient => store.set({ transient }),
      item: store.state.item,
      readOnly: boolean('Form read only', false, 'form'),
      focusNextOnEnter: boolean('Focus next field with [Enter]', false, 'form'),
      i18n: selectV2('I18n', Object.keys(Formol.i18n), 'en', 'form'),
    })
  )

storiesOf('Formol exemples', module)
  .addDecorator(withKnobs)
  .add('Adding a person', withStateForm(props => <PersonForm {...props} />))
  .add(
    'Editing a person',
    withStateForm(props => <PersonForm {...props} />, personExemple)
  )

storiesOf('Native and Contrib fields', module)
  .addDecorator(withKnobs)
  .add(
    'Native fields',
    withStateForm(props => (
      <Formol {...props}>
        <Field name="text">Text</Field>
        <Field type="area" name="area">
          Area
        </Field>
        <Field type="email" name="email">
          E-mail
        </Field>
        <Field type="number" name="number">
          Number
        </Field>
        <Field type="password" name="password">
          Password
        </Field>
        <Field type="tel" name="tel">
          Phone number
        </Field>
        <Field
          name="select"
          type="select"
          choices={{
            'Choice 1': 'key1',
            'Choice 2': 'key2',
            'Choice 3': 'key3',
          }}
        >
          Select
        </Field>
        <Field
          type="checkbox"
          name="checkbox"
          values={{
            'Choice 1': 'c1',
            'Choice 2': 'c2',
          }}
        >
          Checkbox
        </Field>
        <Field
          type="radio"
          name="radio"
          values={{
            'Choice 1': 'c1',
            'Choice 2': 'c2',
          }}
        >
          Radio
        </Field>
        <Field type="checkbox" name="simple-checkbox">
          Checkbox
        </Field>
      </Formol>
    ))
  )
  .add(
    'From libraries',
    withStateForm(props => (
      <Formol {...props}>
        <Field type="switch" name="switch">
          Switch
        </Field>
        <Field
          name="select-menu"
          type="select-menu"
          choices={{
            'Choice 1': 'key1',
            'Choice 2': 'key2',
            'Choice 3': 'key3',
          }}
        >
          Select Menu
        </Field>
        <Field
          name="select-menu-multiple"
          type="select-menu"
          multiple
          choices={{
            'Choice 1': 'key1',
            'Choice 2': 'key2',
            'Choice 3': 'key3',
          }}
        >
          Multiple Select Menu
        </Field>
        <Field type="calendar" name="calendar">
          Calendar
        </Field>
        <Field type="html" name="html">
          HTML
        </Field>
        <Field
          type="filedrop"
          name="filedrop"
          accept="image/*"
          placeholder="Drop an image"
        >
          File
        </Field>
        <Field type="password-strength" name="password-strength">
          Password strength
        </Field>
      </Formol>
    ))
  )

storiesOf('Field Test', module)

const fieldStory = storiesOf('Field Test/Fields', module).addDecorator(
  withKnobs
)
Object.entries(typeFields).forEach(([name, TypeField]) => {
  fieldStory.add(
    `${name} field`,
    withStateForm(props => (
      <Formol {...props}>
        <h1>{name}</h1>
        <TypeField {...knobs(name)} />
      </Formol>
    ))
  )
})

const requiredFieldStory = storiesOf(
  'Field Test/Fields with initial value',
  module
).addDecorator(withKnobs)
Object.entries(typeFields).forEach(([name, TypeField]) => {
  requiredFieldStory.add(
    `${name} field`,
    withStateForm(
      props => (
        <Formol {...props}>
          <h1>{name}</h1>
          <TypeField {...knobs(name)} />
        </Formol>
      ),
      { [name]: testFieldValue(name) }
    )
  )
})
