const UAnchor = () => {
  return (
    <div className="urp-anchor">
      <a href="#section1">Section 1</a>
      <a href="#section2">Section 2</a>
      <a href="#section3">Section 3</a>
    </div>
  )
}

const Item = () => {
  return (
    <div>item</div>
  )
}

UAnchor.Item = Item

export default UAnchor
