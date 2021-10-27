import type{ NavItems } from './types'

export const NAV_ITEMS: NavItems = {
    home: {
        path: '/',
        title: 'home'
    },
    blog: {
        path: '/post',
        title: 'blog'
    },
    tags: {
        path: '/tags',
        title: 'tags'
    },
    media: {
        path: '/media',
        title: 'media'
    },
    about: {
        path: '/about',
        title: 'about'
    }
}

export const SITE = {
    // Your site's detail?
    name: 'James Perkins',
    title: 'James Perkins Blog',
    description: 'Learn To Code with James',
    url: 'https://jamesperkins.dev',
    githubUrl: 'https://github.com/perkinsjr/blog.jamesperkins.dev',
    listDrafts: true
    // description ?
}

export const PAGE_SIZE = 8
