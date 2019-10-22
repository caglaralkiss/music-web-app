import { shallowMount } from '@vue/test-utils'
import Auth from '@/views/Auth.vue'

describe('Auth.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Auth, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
