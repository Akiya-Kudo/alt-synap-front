import { memo } from 'react'

let render = 0

console.log('render Child');

export const Header = () => {
    console.log(`render${render}`)
    render++
    return <header>header</header>
};