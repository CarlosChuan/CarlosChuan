
interface DivProps extends React.HTMLProps<HTMLDivElement> {
  
}


export const Grid = ({children, ...props}: DivProps) => {
  return (
    <div {...props}>
      {children}
    </div>
  )
}