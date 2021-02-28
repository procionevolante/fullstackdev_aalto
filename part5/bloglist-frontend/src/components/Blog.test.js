import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'how to test components in React',
  author: 'University of Helsinki',
  url: 'fuffa.it',
  likes: 10,
}

test('renders content', () => {
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

test('show-details button click', () => {
  const f = () => {}; // dummy function to not trigger propTypes/React complaining
  const component = render(
    <Blog
      blog={blog}
      toggleDetails={f}
      like={f}
      remove={f}
    />
  )
  const showDetailsBtn = component.getByText('view');
  fireEvent.click(showDetailsBtn)
  
  expect(component.container).toHaveTextContent(
    'fuffa.it'
  )
  expect(component.container).toHaveTextContent(
    '10'
  )
})
