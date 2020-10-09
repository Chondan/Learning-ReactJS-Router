# React Router

## Concepts
`npm install react-router-dom`

There are 3 main parts componet
1. BrowserRouter as Router
2. Route
    - Match the url provided by Link
    - `<Route path="/g/:gistId" render={({ match }) => <Component />} />`
    - `<Route path="/g/:gistId" component={MyComponent}>`
    - like trying to get current url and do something to match with `<Link>` we have just provided by using `match prop`.
3. Link
   - like &lt;a&gt; in html
   - `<Link to={"/g/:gistId"}><Component /></Link>`

> Note: If you want to set the style of element covered by Link Component, you have to set the style prop in Link Component instead.

## CSS 
### sidebar-item
- whitespace: nowrap;
- text-overflow: elipsis;
- overflow: hidden;

## React
- `props.children(data)`
- `<Parent>{data => <pre>{data}</pre>}</Parent>` 
- render prop
  - `<Parent render={(dataWeGot) => <MyComponent>}/>`
  - But before this we have to set where to render inside `Parent` component
  - `<Parent><h1>Hello world</h1>{this.props.render(dataWeWantToPass)}</Parent>`
## Fetch API
- fetch api from (non json url like protocal://domain/path/endpoint.txt)
- use method `res.text()` instead of res.json() while fetching the data
  
## ContentEditable Component
`npm install react-contenteditable`