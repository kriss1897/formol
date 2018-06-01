import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import Formol, { Field } from '../src'
import { withStateForm } from './utils'

const creditCard = v =>
  v
    ? v
        .replace(/\D/g, '')
        .split('')
        .map((digit, i) => ((i + 1) % 4 ? digit : `${digit}-`))
        .join('')
        .replace(/-$/, '')
    : ''

const numberWithSpace = v =>
  v
    ? v
        .replace(/ /g, '')
        .split('')
        .reverse()
        .map((digit, i) => (i % 3 ? digit : `${digit} `))
        .reverse()
        .join('')
        .trim()
    : ''

storiesOf('Formatters', module)
  .addDecorator(withKnobs)
  .add(
    'Item to field formatter',
    withStateForm(props => (
      <Formol {...props}>
        <h1>Item to field formatter</h1>
        <Field name="text" formatter={v => v || 'Non empty'}>
          Default value
        </Field>
      </Formol>
    ))
  )
  .add(
    'Field to item formatter',
    withStateForm(
      props => (
        <Formol {...props}>
          <h1>Field to item formatter</h1>
          <Field name="strnumber" unformatter={v => +v.replace(/\D/g, '')}>
            String cleaned and parsed as a number
          </Field>
        </Formol>
      ),
      { strnumber: 1337 }
    )
  )
  .add(
    'Field normalizer',
    withStateForm(
      props => (
        <Formol {...props}>
          <h1>Field normalizer</h1>
          <Field name="strnumber" normalizer={v => v && +v.replace(/\D/g, '')}>
            String cleaned and parsed as a number on blur
          </Field>
        </Formol>
      ),
      { strnumber: 1337 }
    )
  )
  .add(
    'Bidirectional formatters',
    withStateForm(
      props => (
        <Formol {...props}>
          <h1>Bidirectional formatters</h1>
          <Field
            name="money"
            formatter={v => (v ? `${v} $` : '')}
            unformatter={v => +v.replace(/\D/g, '') || ''}
          >
            Money
          </Field>
          <Field
            name="bignumber"
            formatter={numberWithSpace}
            unformatter={numberWithSpace}
          >
            Big number (actually a formatted string)
          </Field>
          <Field
            name="creditcard"
            pattern="\d{4}-\d{4}-\d{4}-\d{4}"
            formatter={creditCard}
            unformatter={creditCard}
          >
            Credit Card
          </Field>
        </Formol>
      ),
      { money: 42, bignumber: '0123456789' }
    )
  )
