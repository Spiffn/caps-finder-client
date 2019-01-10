import { shallowMount } from '@vue/test-utils';
import ChatBox from '../../src/components/ChatBox.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(ChatBox, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
