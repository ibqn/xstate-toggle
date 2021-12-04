import { createMachine, interpret } from 'xstate'

document.getElementById('app').innerHTML = `
<h1>XState TypeScript Toggle Example</h1>
<div>
  Open the <strong>Console</strong> to view the machine output.
</div>
`

const toggle = document.getElementById('toggle')
const span = document.getElementById('state')

span.innerText = 'inactive'

interface ToggleContext {
  count: number
}

type ToggleEvent = {
  type: 'TOGGLE'
}

const machine = createMachine<ToggleContext, ToggleEvent>({
  id: 'machine',
  initial: 'inactive',
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { TOGGLE: 'active' },
    },
    active: {
      on: { TOGGLE: 'inactive' },
    },
  },
})

const service = interpret(machine).onTransition((state) => {
  console.log(state.value)

  span.innerText = state.value.toString()
})

service.start()

service.send('TOGGLE')
service.send('TOGGLE')

toggle.addEventListener('click', () => service.send('TOGGLE'))
