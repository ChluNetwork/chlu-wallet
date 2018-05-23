/*

Eventually, this thing should be replaced with dispatch(push(path))
or with <Link> componenets from react-router-dom.

However this hack works as well so for now I'm keeping it until we
refactor all the points in which it's currently used

*/

export default path => window.appHistory.push(path)
