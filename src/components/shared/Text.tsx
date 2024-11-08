
type TextTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

interface TextProps extends React.PropsWithChildren {
  style?: React.CSSProperties;
  type?: TextTypes;

}

export const Text = ({children, style, type}: TextProps) => {

  const Tag = type || 'p'

  return (
    <Tag style={style}>
      {children}
    </Tag>
  )
}