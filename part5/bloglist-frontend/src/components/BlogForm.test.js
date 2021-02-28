import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

beforeEach(async () => {

});

test('new blog submit', () => {
  const createBlog = jest.fn();

  const component = render(
    <BlogForm onSubmit={createBlog} />
  )

  const titleTxt = component.container.querySelector('input[name=title]');
  const authorTxt = component.container.querySelector('input[name=author]');
  const urlTxt = component.container.querySelector('input[name=url]');
  const form = component.container.querySelector('form');

  fireEvent.change(titleTxt, { 
    target: { value: 'testing of forms could be easier' } 
  })
  fireEvent.change(authorTxt, { 
    target: { value: 'testing of forms should be easier' } 
  })
  fireEvent.change(urlTxt, { 
    target: { value: 'testing of forms must be easier' } 
  })
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' );
  expect(createBlog.mock.calls[0][0].author).toBe('testing of forms should be easier' );
  expect(createBlog.mock.calls[0][0].url).toBe('testing of forms must be easier' );
})
