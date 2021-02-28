import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'how to test components in React',
    author: 'University of Helsinki',
    url: 'fuffa.it',
    likes: 10,
  }
  const f = () => {}; // dummy function to not trigger propTypes/React complaining

  const component = render(
    <Blog
      blog={blog}
      toggleDetails={f}
      like={f}
      remove={f}
    />
  )

  expect(component.container).toHaveTextContent(
    'how to test components in React'
  )
  expect(component.container).toHaveTextContent(
    'University of Helsinki'
  )
  expect(component.container.querySelector('.blog-url')).toBeNull();
  expect(component.container.querySelector('.blog-likes')).toBeNull();
})
