/* eslint-disable react/prop-types */
const Header = ({title}) => {
  return (
    <nav className="py-5 px-10 bg-zinc-800">
       <h1 className="text-2xl font-bold">{title}</h1>
    </nav>
  )
}

export default Header