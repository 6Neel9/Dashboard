import React from 'react'
import ReactLoading from 'react-loading'
import styled from 'tachyons-components'

const Section = styled(
  'div'
)`flex flex-wrap content-center justify-center w-full h-full bg-transparent`

const Article = styled(
  'div'
)`w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap`

const Prop = styled('h3')`f5 f4-ns mt-8 white`


const Loading = () => (
  <Section>
    <Article>
      <ReactLoading type='spinningBubbles' color='#fff' />
      <Prop>Loading...</Prop>
    </Article>
  </Section>
)

export default Loading
